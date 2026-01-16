import Sidebar from "../../components/admin/Sidebar";
import DashboardCard from "../../components/admin/DashboardCard";

export default function Dashboard() {
  // Temporary mock data (later replace with API)
  const stats = [
    { title: "Total Users", value: "120" },
    { title: "Total Orders", value: "56" },
    { title: "Total Revenue", value: "$12,450" },
    { title: "Products", value: "32" },
  ];

  const recentOrders = [
    {
      id: "ORD-1021",
      user: "John Doe",
      total: "$450",
      paid: true,
      delivered: false,
    },
    {
      id: "ORD-1022",
      user: "Sarah Khan",
      total: "$899",
      paid: true,
      delivered: true,
    },
    {
      id: "ORD-1023",
      user: "Ali Raza",
      total: "$299",
      paid: false,
      delivered: false,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#0A1F44]">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Overview of your watch store
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <DashboardCard
              key={index}
              title={item.title}
              value={item.value}
            />
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-[#0A1F44]">
              Recent Orders
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Delivery</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3 text-[#0A1F44]">
                      {order.id}
                    </td>
                    <td className="p-3">{order.user}</td>
                    <td className="p-3">{order.total}</td>
                    <td className="p-3">
                      {order.paid ? (
                        <span className="text-green-600 font-medium">
                          Paid
                        </span>
                      ) : (
                        <span className="text-red-500 font-medium">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      {order.delivered ? (
                        <span className="text-green-600 font-medium">
                          Delivered
                        </span>
                      ) : (
                        <span className="text-yellow-600 font-medium">
                          Processing
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
