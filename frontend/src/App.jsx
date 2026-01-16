import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";

/* Pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

/* Admin Pages */
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import AdminBrands from "./pages/admin/Brands";
import AddBrand from "./pages/admin/AddBrand";
import AdminOrders from "./pages/admin/Orders";
import Analytics from "./pages/admin/Analytics";
import Products from "./pages/admin/Products";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductPage />} />

          {/* User Protected */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute admin>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute admin>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/add"
            element={
              <ProtectedRoute admin>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/products/edit/:id" 
          element={
          <ProtectedRoute admin>
            <AddProduct />
          </ProtectedRoute>
          } />
          <Route
            path="/admin/brands"
            element={
              <ProtectedRoute admin>
                <AdminBrands />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/brands/add"
            element={
              <ProtectedRoute admin>
                <AddBrand />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute admin>
                <AdminOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute admin>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute admin>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
