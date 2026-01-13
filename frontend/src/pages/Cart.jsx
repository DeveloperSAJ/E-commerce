import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { removeFromCart } from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.cart);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 border rounded p-4">
        <h2 className="text-xl font-bold text-[#0A1F44] mb-4">
          Your Cart
        </h2>

        {items.map((item) => (
          <CartItem
            key={item.product._id}
            item={item}
            onRemove={(id) => dispatch(removeFromCart(id))}
          />
        ))}
      </div>

      <CartSummary
        items={items}
        onCheckout={() => alert("Checkout")}
      />
    </div>
  );
}
