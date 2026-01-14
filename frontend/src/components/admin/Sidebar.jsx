import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-[#0A1F44] text-white min-h-screen p-4">
      <nav className="space-y-3 text-lg flex flex-col">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/analytics">Analytics</Link>
      </nav>
    </aside>
  );
}
