import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, clearCart } from "../features/cart/cartSlice";
import { placeOrder } from "../features/orders/orderSlice";
import { calculateCartTotal, formatPrice } from "../utils/helpers";
import toast, { Toaster } from "react-hot-toast";
import api from "../app/api";
import { FaStripe, FaPaypal } from "react-icons/fa";

export default function Checkout() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Stripe");

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!shippingAddress.address || !shippingAddress.city) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    setLoading(true);

    try {
      const totalAmount = calculateCartTotal(items);

      if (paymentMethod === "Stripe") {
        // Stripe payment
        const { data: paymentData } = await api.post("/payments/stripe-intent", {
          amount: totalAmount,
        });

        const paymentSuccess = window.confirm(
          `Pay ${formatPrice(totalAmount)} with Stripe? (Simulated)`
        );

        if (!paymentSuccess) {
          toast.error("Stripe payment cancelled.");
          setLoading(false);
          return;
        }
      } else if (paymentMethod === "PayPal") {
        // PayPal payment
        const paymentSuccess = window.confirm(
          `Pay ${formatPrice(totalAmount)} with PayPal? (Simulated)`
        );

        if (!paymentSuccess) {
          toast.error("PayPal payment cancelled.");
          setLoading(false);
          return;
        }
      }

      // Place order
      const orderData = {
        orderItems: items.map((i) => ({
          product: i.product._id,
          name: i.product.name,
          qty: i.quantity,
          price: i.product.price,
          image: i.product.images?.[0]?.url || "",
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice: totalAmount,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: totalAmount,
      };

      await dispatch(placeOrder(orderData)).unwrap();

      // Clear cart
      dispatch(clearCart());
      toast.success("Order placed successfully!");

      setShippingAddress({
        address: "",
        city: "",
        postalCode: "",
        country: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Checkout failed. Try again!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold text-[#0A1F44] mb-6">Checkout</h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          Your cart is empty.
        </p>
      ) : (
        <div className="border rounded p-6 space-y-4">
          {/* Shipping */}
          <h3 className="font-semibold text-[#0A1F44] mb-2">Shipping Address</h3>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingAddress.address}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingAddress.city}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={shippingAddress.postalCode}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={shippingAddress.country}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />

          {/* Payment Method */}
          <h3 className="font-semibold text-[#0A1F44] mt-4 mb-2">Payment Method</h3>
          <div className="flex gap-4">
            <button
              className={`flex items-center gap-2 border p-2 rounded w-1/2 justify-center ${
                paymentMethod === "Stripe" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setPaymentMethod("Stripe")}
            >
              <FaStripe /> Stripe
            </button>
            <button
              className={`flex items-center gap-2 border p-2 rounded w-1/2 justify-center ${
                paymentMethod === "PayPal" ? "bg-yellow-500 text-white" : ""
              }`}
              onClick={() => setPaymentMethod("PayPal")}
            >
              <FaPaypal /> PayPal
            </button>
          </div>

          {/* Order Summary */}
          <h3 className="font-semibold text-[#0A1F44] mt-4 mb-2">Order Summary</h3>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.product._id} className="flex justify-between">
                <span>{item.product.name} × {item.quantity}</span>
                <span>{formatPrice(item.product.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="font-bold text-right mt-2">
            Total: {formatPrice(calculateCartTotal(items))}
          </p>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-4 w-full bg-[#0A1F44] text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Processing..." : `Pay & Place Order with ${paymentMethod}`}
          </button>
        </div>
      )}
    </div>
  );
}
