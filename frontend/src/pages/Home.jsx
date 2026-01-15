import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductList from "../components/products/ProductList";

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0A1F44] mb-6">
        Featured Watches
      </h1>
      <div className="">
      <ProductList products={items} loading={loading} />
      </div>
    </div>
  );
}
