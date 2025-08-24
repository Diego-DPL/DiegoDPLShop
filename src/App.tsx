import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import './App.css'
import Header from "./components/layout/header"
import Footer from "./components/layout/footer"
import Notification from "./components/Notification"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Catalog from "./pages/Catalog"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Success from "./pages/Success"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useAuth } from "./context/AuthContext"
import VerifyEmail from "./pages/VerifyEmail"
import Account from "./pages/Account"
import Admin from "./pages/Admin"
import AdminProducts from "./pages/AdminProducts"

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-gray-300 p-6">Cargando…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.emailVerified) return <Navigate to="/verify-email" replace />;
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, profileLoading } = useAuth();
  if (loading || profileLoading) return <div className="text-gray-300 p-6">Cargando…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.emailVerified) return <Navigate to="/verify-email" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Notification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-me" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
