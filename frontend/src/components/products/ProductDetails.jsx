import { formatPrice } from "../../utils/helpers";

export default function ProductDetails({ product, onAdd }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <img
        src={product.image}
        className="rounded-lg w-full"
      />

      <div>
        <h1 className="text-2xl font-bold text-[#0A1F44]">
          {product.name}
        </h1>

        <p className="text-[#6B7280] my-3">
          {product.description}
        </p>

        <p className="font-semibold">
          {formatPrice(product.price)}
        </p>

        <button
          onClick={onAdd}
          className="mt-4 bg-[#0A1F44] text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
