import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";

export default function ProductCard({ product }) {
  return (
    <div className="group mt-5 bg-white border-2 border-[#0A1F44]/80 rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="h-52 w-full flex items-center justify-center overflow-hidden rounded-lg border-2 border-[#0A1F44] bg-white">
        <img
          src={product.images?.[0]?.url || "/placeholder.png"}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-[#0A1F44] line-clamp-2">
          {product.name}
        </h3>

        <p className="text-base font-bold text-[#0A1F44]">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Action */}
      <Link
        to={`/products/${product._id}`}
        className="mt-4 inline-flex items-center justify-center w-full rounded-lg bg-[#0A1F44] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#132e63]"
      >
        View Details
      </Link>
    </div>
  );
}
