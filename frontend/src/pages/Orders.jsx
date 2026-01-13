import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/orders/orderSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-[#0A1F44] mb-4">
        My Orders
      </h2>

      {items.map((o) => (
        <div key={o._id} className="border p-4 rounded mb-3">
          Order #{o._id} — {o.status}
        </div>
      ))}
    </div>
  );
}
