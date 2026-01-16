import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductList from "../components/products/ProductList";

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 🔹 Filters
  const featured = items.slice(0, 4); // first 4 products
  const appleWatches = items.filter(
    (p) => p.brand?.name === "Apple"
  );
  const rolexWatches = items.filter(
    (p) => p.brand?.name === "Rolex"
  );
  const jacobWatches = items.filter(
    (p) => p.brand?.name === "Jacob"
  );

  return (
    <div className="flex flex-col gap-14 px-4 py-8">

      {/* Featured */}
      <section>
        <h1 className="text-3xl text-center font-bold text-[#0A1F44] mb-6">
          Featured Watches
        </h1>
        {/* <ProductList products={featured} loading={loading} /> */}
      </section>

      {/* Jacob */}
      {/* <section>
        <h2 className="text-2xl mx-auto font-bold text-[#0A1F44] mb-6">
          Jacob Watches
        </h2>
        <ProductList products={jacobWatches} loading={loading} />
      </section> */}

      {/* Apple */}
      <section>
        <h2 className="text-2xl mx-auto font-bold text-[#0A1F44] mb-6">
          Apple Watches
        </h2>
        <ProductList products={appleWatches} loading={loading} />
      </section>

      {/* Rolex */}
      <section>
        <h2 className="text-2xl mx-auto font-bold text-[#0A1F44] mb-6">
          Rolex Collection
        </h2>
        <ProductList products={rolexWatches} loading={loading} />
      </section>

    </div>
  );
}
