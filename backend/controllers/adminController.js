import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user (admin only)
// @route   DELETE /api/admin/users/:id
// @access  Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.isAdmin) {
        return res.status(400).json({ message: 'Cannot delete admin user' });
      }
      await user.remove();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product stats (total count, by brand, etc.)
// @route   GET /api/admin/product-stats
// @access  Admin
export const getProductStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    // Group by brand with counts
    const brandStats = await Product.aggregate([
      {
        $group: {
          _id: '$brand',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      totalProducts,
      brandStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order stats (total sales, orders count, recent orders...)
// @route   GET /api/admin/order-stats
// @access  Admin
export const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' },
        },
      },
    ]);

    // Last 5 orders example
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email')
      .lean();

    res.json({
      totalOrders,
      totalSales: totalSales[0]?.total || 0,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};