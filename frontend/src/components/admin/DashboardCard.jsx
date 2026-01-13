export default function DashboardCard({ title, value }) {
  return (
    <div className="border rounded p-4">
      <h4 className="text-sm text-[#6B7280]">{title}</h4>
      <p className="text-xl font-bold text-[#0A1F44]">{value}</p>
    </div>
  );
}
