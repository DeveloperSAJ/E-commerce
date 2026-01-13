import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/admin/Sidebar";
import { fetchOrders } from "../../features/orders/orderSlice";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const { items: orders = [], loading } = useSelector((s) => s.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-white">
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
                  <td className="p-3 text-[#0A1F44]">{order._id}</td>
                  <td className="p-3 text-[#6B7280]">{order.user?.name}</td>
                  <td className="p-3 text-[#6B7280]">${order.totalPrice}</td>
                  <td className="p-3">{order.status}</td>
                  <td className="p-3 flex gap-3">
                    <button className="text-[#0A1F44] hover:underline">View</button>
                    <button className="text-red-500 hover:underline">Delete</button>
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
