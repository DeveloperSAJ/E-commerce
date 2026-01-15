import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/admin/Sidebar";
import { fetchProducts } from "../../features/products/productSlice";
import { formatPrice } from "../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import api from "../../app/api";

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items = [], loading } = useSelector((state) => state.products);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product deleted!");
      dispatch(fetchProducts()); // refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  // Edit product
  const handleEdit = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#0A1F44]">Products</h1>

          {user?.role === "admin" && (
            <Link
              to="/admin/products/add"
              className="bg-[#0A1F44] text-white px-4 py-2 rounded hover:bg-[#08203a]"
            >
              + Add Product
            </Link>
          )}
        </div>

        <div className="border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0A1F44] text-white">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    Loading products...
                  </td>
                </tr>
              )}

              {!loading && items.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}

              {items.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="p-3">
                    <img
                      src={product.images?.[0]?.url || "/placeholder.png"}
                      alt={product.name}
                      className="h-10 w-10 object-cover rounded"
                    />
                  </td>

                  <td className="p-3 font-medium text-[#0A1F44]">
                    {product.name}
                  </td>

                  <td className="p-3 text-gray-600">
                    {formatPrice(product.price)}
                  </td>

                  <td className="p-3">
                    {product.stock > 0 ? (
                      <span className="text-green-600">{product.stock}</span>
                    ) : (
                      <span className="text-red-500">Out</span>
                    )}
                  </td>

                  <td className="p-3 space-x-3">
                    <button
                      className="text-[#0A1F44]"
                      onClick={() => handleEdit(product._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
