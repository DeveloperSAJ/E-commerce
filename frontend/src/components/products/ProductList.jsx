import ProductCard from "./ProductCard";
import Loader from "../common/Loader";

export default function ProductList({ products = [], loading }) {
  if (loading) return <Loader />;

  if (!Array.isArray(products) || products.length === 0) {
    return <p className="text-center text-[#6B7280]">No products found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
