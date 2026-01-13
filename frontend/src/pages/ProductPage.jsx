import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../features/products/productSlice";
import ProductDetails from "../components/products/ProductDetails";
import { addToCart } from "../features/cart/cartSlice";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id]);

  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ProductDetails
        product={product}
        onAdd={() => dispatch(addToCart({ productId: id }))}
      />
    </div>
  );
}
