import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/admin/Sidebar";
import DashboardCard from "../../components/admin/DashboardCard";
import { fetchAnalytics } from "../../features/analytics/analyticsSlice";

// Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Analytics() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((s) => s.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (loading || !data) {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <main className="flex-1 p-6 text-center text-gray-500">
          Loading analytics...
        </main>
      </div>
    );
  }

  // Dashboard cards (REAL DATA)
  const cards = [
    { title: "Total Users", value: data.totalUsers },
    { title: "Total Orders", value: data.totalOrders },
    { title: "Revenue", value: `$${data.totalRevenue.toLocaleString()}` },
    { title: "Total Watches", value: data.totalProducts },
  ];

  // Pie Chart → Watch Sales by Brand
  const pieData = {
    labels: data.salesByBrand.map((b) => b.brand),
    datasets: [
      {
        data: data.salesByBrand.map((b) => b.count),
        backgroundColor: [
          "#0A1F44",
          "#2563EB",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw} watches`,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-[#0A1F44]">
          Watch Store Analytics
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <DashboardCard key={i} title={c.title} value={c.value} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Watch Sales by Brand
            </h2>
            <div className="h-[320px]">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>

          {/* Ready for future charts */}
          <div className="bg-gray-50 p-6 rounded-lg border flex items-center justify-center text-gray-400">
            More analytics coming soon (monthly sales, top watches, etc.)
          </div>
        </div>
      </main>
    </div>
  );
}
