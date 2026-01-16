import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/admin/Sidebar";
import { fetchOrders } from "../../features/orders/orderSlice";
import toast, { Toaster } from "react-hot-toast";
import { formatPrice } from "../../utils/helpers";
import api from "../../app/api";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const ordersState = useSelector((s) => s.orders || {});
  const orders = ordersState.items || [];
  const loading = ordersState.loading || false;

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await api.delete(`/orders/${orderId}`);
      toast.success("Order deleted successfully!");
      dispatch(fetchOrders());
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete order.");
    }
  };

  const getStatusLabel = (order) => {
    if (order.isDelivered) return "Delivered";
    if (order.isPaid) return "Paid";
    return "Pending";
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Toaster position="top-right" />
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-[#0A1F44] mb-6">Orders</h1>

        <div className="border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0A1F44] text-white">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-[#6B7280]">
                    Loading orders...
                  </td>
                </tr>
              )}
              {!loading && orders.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-[#6B7280]">
                    No orders found
                  </td>
                </tr>
              )}
              {orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-[#0A1F44]">{order._id.slice(-6)}</td>
                  <td className="p-3 text-[#6B7280]">{order.user?.name || "N/A"}</td>
                  <td className="p-3 text-[#6B7280]">{formatPrice(order.totalPrice)}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        order.isDelivered
                          ? "bg-green-500"
                          : order.isPaid
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {getStatusLabel(order)}
                    </span>
                  </td>
                  <td className="p-3 flex gap-3">
                    <button
                      className="text-[#0A1F44] hover:underline"
                      onClick={() => window.alert(JSON.stringify(order, null, 2))}
                    >
                      View
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
