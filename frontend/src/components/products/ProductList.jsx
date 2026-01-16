import ProductCard from "./ProductCard";
import Loader from "../common/Loader";

export default function ProductList({ products = [], loading }) {
  if (loading) return <Loader />;

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <p className="text-center text-[#6B7280]">No products found</p>
    );
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
      {products.map((p) => (
        <div
          key={p._id}
          className="flex-shrink-0 w-[260px]"
        >
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
