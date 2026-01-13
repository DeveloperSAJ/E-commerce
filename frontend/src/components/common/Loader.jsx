export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="h-10 w-10 border-4 border-[#D1D5DB] border-t-[#0A1F44] rounded-full animate-spin" />
      <p className="mt-3 text-[#6B7280] text-sm">{text}</p>
    </div>
  );
}
