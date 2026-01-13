import { formatPrice } from "../../utils/helpers";

export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex justify-between items-center border-b py-3">
      <div>
        <h4 className="text-[#0A1F44]">{item.product.name}</h4>
        <p className="text-sm text-[#6B7280]">
          {formatPrice(item.product.price)} × {item.quantity}
        </p>
      </div>

      <button
        onClick={() => onRemove(item.product._id)}
        className="text-red-500 text-sm"
      >
        Remove
      </button>
    </div>
  );
}
