import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { createBrand } from "../../features/brand/brandSlice";

export default function AddBrand() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.brands);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    const brandData = {
      name,
      description,
      logoUrl,
    };

    const res = await dispatch(createBrand(brandData));

    if (!res.error) {
      navigate("/admin/brands");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 p-6 max-w-xl">
        <h1 className="text-2xl font-bold text-[#0A1F44] mb-6">Add Brand</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Brand name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Logo URL"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#0A1F44] text-white px-4 py-2 rounded hover:opacity-90"
          >
            {loading ? "Creating..." : "Create Brand"}
          </button>
        </form>
      </main>
    </div>
  );
}
