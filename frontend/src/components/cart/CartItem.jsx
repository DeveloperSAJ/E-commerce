import { formatPrice } from "../../utils/helpers";
import toast from "react-hot-toast";

export default function CartItem({ item, onRemove }) {
  const handleRemove = () => {
    onRemove(item.product._id); // Call parent remove function
    toast.success("Item removed from cart!"); // Show toast
  };

  return (
    <div className="flex justify-between items-center border-b py-3">
      {/* Product Info with Image */}
      <div className="flex items-center gap-4">
        <img
          src={item.product.images?.[0]?.url || "/placeholder.png"}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h4 className="text-[#0A1F44]">{item.product.name}</h4>
          <p className="text-sm text-[#6B7280]">
            {formatPrice(item.product.price)} × {item.quantity}
          </p>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="text-red-500 text-sm hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
