import Sidebar from "../../components/admin/Sidebar";
import DashboardCard from "../../components/admin/DashboardCard";

export default function Analytics() {
  // Placeholder analytics data
  const analyticsData = [
    { title: "Total Users", value: 120 },
    { title: "Total Orders", value: 56 },
    { title: "Revenue", value: "$12k" },
    { title: "Products", value: 32 },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((item, i) => (
          <DashboardCard key={i} title={item.title} value={item.value} />
        ))}
      </main>
    </div>
  );
}
