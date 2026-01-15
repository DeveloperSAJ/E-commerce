import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 max-w-2xs hover:shadow-md transition">
      <img
        src={product.images?.[0]?.url || "/placeholder.png"}
        alt={product.name}
        className="h-auto w-70 object-cover rounded"
      />

      <h3 className="mt-3 font-semibold text-[#0A1F44]">
        {product.name}
      </h3>

      <p className="text-[#6B7280] text-sm">
        {formatPrice(product.price)}
      </p>

      <Link
        to={`/products/${product._id}`}
        className="inline-block mt-3 text-sm text-white bg-[#0A1F44] px-4 py-1 rounded"
      >
        View
      </Link>
    </div>
  );
}
