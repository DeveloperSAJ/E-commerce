import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../app/api";

export default function AddProduct() {
  const { token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [discount, setDiscount] = useState(0);
  const [images, setImages] = useState([]); // array of { url, alt }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle adding image URLs
  const handleAddImage = () => {
    setImages([...images, { url: "", alt: "" }]);
  };

  const handleImageChange = (index, field, value) => {
    const newImages = [...images];
    newImages[index][field] = value;
    setImages(newImages);
  };

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await api.post(
        "/products",
        { name, description, price, stock, categories: [category], brand, discount, images },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(true);
      setName("");
      setDescription("");
      setPrice("");
      setStock(0);
      setCategory("");
      setBrand("");
      setDiscount(0);
      setImages([]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-[#0A1F44] mb-4">Add New Product</h2>

      {success && <p className="text-green-600 mb-2">Product created successfully!</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-[#D1D5DB] rounded px-3 py-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-[#D1D5DB] rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-[#D1D5DB] rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border border-[#D1D5DB] rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-[#D1D5DB] rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Brand ID"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border border-[#D1D5DB] rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder="Discount (%)"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="w-full border border-[#D1D5DB] rounded px-3 py-2"
        />

        <div>
          <h3 className="text-[#0A1F44] font-semibold mb-1">Images</h3>
          {images.map((img, i) => (
            <div key={i} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Image URL"
                value={img.url}
                onChange={(e) => handleImageChange(i, "url", e.target.value)}
                className="border border-[#D1D5DB] rounded px-2 py-1 flex-1"
              />
              <input
                type="text"
                placeholder="Alt text"
                value={img.alt}
                onChange={(e) => handleImageChange(i, "alt", e.target.value)}
                className="border border-[#D1D5DB] rounded px-2 py-1 flex-1"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImage}
            className="bg-[#0A1F44] text-white px-3 py-1 rounded hover:bg-[#08203a]"
          >
            Add Image
          </button>
        </div>

        <button
          type="submit"
          className="bg-[#0A1F44] text-white px-4 py-2 rounded hover:bg-[#08203a]"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
