import { calculateCartTotal, formatPrice } from "../../utils/helpers";

export default function CartSummary({ items, onCheckout }) {
  return (
    <div className="border p-4 rounded">
      <h3 className="font-semibold text-[#0A1F44] mb-3">
        Order Summary
      </h3>

      <p className="text-[#6B7280]">
        Total: {formatPrice(calculateCartTotal(items))}
      </p>

      <button
        onClick={onCheckout}
        className="mt-4 w-full bg-[#0A1F44] text-white py-2 rounded"
      >
        Checkout
      </button>
    </div>
  );
}
