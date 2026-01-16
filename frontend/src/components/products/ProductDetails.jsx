import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { formatPrice } from "../../utils/helpers";
import toast from "react-hot-toast";

export default function ProductDetails({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!product?._id) return;
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    toast.success("Item added to cart!");
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <img
        src={product.images?.[0]?.url || "/placeholder.png"}
        alt={product.name}
        className="rounded-lg w-50 h-auto object-cover mx-auto"
      />

      <div>
        <h1 className="text-2xl font-bold text-[#0A1F44]">{product.name}</h1>
        <p className="text-[#6B7280] my-3">{product.description}</p>
        <p className="font-semibold">{formatPrice(product.price)}</p>
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-[#0A1F44] text-white px-6 py-2 rounded hover:bg-[#132e63] transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
