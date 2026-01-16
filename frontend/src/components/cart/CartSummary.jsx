import { calculateCartTotal, formatPrice } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

export default function CartSummary({ items, loading = false }) {
  const navigate = useNavigate();
  const isDisabled = items.length === 0 || loading;

  const handleCheckout = () => {
    if (!isDisabled) {
      navigate("/checkout");
    }
  };

  return (
    <div className="border p-4 rounded">
      <h3 className="font-semibold text-[#0A1F44] mb-3">
        Order Summary
      </h3>

      <p className="text-[#6B7280]">
        Total: {formatPrice(calculateCartTotal(items))}
      </p>

      <button
        onClick={handleCheckout}
        disabled={isDisabled}
        className={`mt-4 w-full py-2 rounded text-white 
          ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#0A1F44] hover:bg-[#08173a]"}
        `}
      >
        {loading ? "Processing..." : "Checkout"}
      </button>

      {items.length === 0 && (
        <p className="mt-2 text-sm text-red-500 text-center">
          Your cart is empty
        </p>
      )}
    </div>
  );
}
