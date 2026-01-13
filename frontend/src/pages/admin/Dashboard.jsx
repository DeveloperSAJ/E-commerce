import Sidebar from "../../components/admin/Sidebar";
import DashboardCard from "../../components/admin/DashboardCard";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6 grid grid-cols-3 gap-6">
        <DashboardCard title="Users" value="120" />
        <DashboardCard title="Orders" value="56" />
        <DashboardCard title="Revenue" value="$12k" />
      </main>
    </div>
  );
}
