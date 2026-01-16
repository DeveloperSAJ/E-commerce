import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { fetchBrands } from "../../features/brand/brandSlice";

export default function Brands() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: brands = [], loading, error } = useSelector((s) => s.brands);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#0A1F44]">Brands</h1>

          <button
            onClick={() => navigate("/admin/brands/add")}
            className="bg-[#0A1F44] text-white px-4 py-2 rounded hover:opacity-90"
          >
            + Add Brand
          </button>
        </div>

        <div className="border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0A1F44] text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Logo</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    Loading brands...
                  </td>
                </tr>
              )}

              {!loading && brands.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    No brands found
                  </td>
                </tr>
              )}

              {brands.map((brand) => (
                <tr key={brand._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium text-[#0A1F44]">{brand.name}</td>
                  <td className="p-3 text-gray-700">{brand.description}</td>
                  <td className="p-3">
                    {brand.logoUrl ? (
                      <img src={brand.logoUrl} alt={brand.name} className="w-10 h-10 object-contain" />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3 flex gap-3">
                    <button className="text-[#0A1F44] hover:underline">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {error && (
            <p className="text-red-500 text-center p-4">{error}</p>
          )}
        </div>
      </main>
    </div>
  );
}
