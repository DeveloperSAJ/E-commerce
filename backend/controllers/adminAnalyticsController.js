import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

export const getAnalytics = async (req, res) => {
  try {
    // 1️⃣ Core Metrics
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    const totalProducts = await Product.countDocuments();

    // 2️⃣ Sales by Brand (PIE CHART)
    const salesByBrand = await Order.aggregate([
      { $unwind: "$orderItems" },
      {
        $lookup: {
          from: "products",
          localField: "orderItems.product",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $group: {
          _id: "$product.brand",
          totalSales: {
            $sum: {
              $multiply: ["$orderItems.qty", "$orderItems.price"],
            },
          },
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "_id",
          foreignField: "_id",
          as: "brand",
        },
      },
      { $unwind: "$brand" },
      {
        $project: {
          _id: 0,
          brand: "$brand.name",
          totalSales: 1,
        },
      },
    ]);

    res.json({
      metrics: {
        totalUsers,
        totalOrders,
        totalRevenue,
        totalProducts,
      },
      salesByBrand,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ message: "Failed to load analytics" });
  }
};
