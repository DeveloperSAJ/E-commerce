import ProductCard from "./ProductCard";
import Loader from "../common/Loader";

export default function ProductList({ products, loading }) {
  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
