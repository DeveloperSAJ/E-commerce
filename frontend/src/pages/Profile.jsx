import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-[#0A1F44] mb-4">
        Profile
      </h2>

      <div className="border rounded p-4 text-[#6B7280]">
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
}
