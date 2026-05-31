import { Link } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import { useAuth } from "../../hooks/useAuth"
import { useCartStore } from "../../store/cartStore"

export default function Navbar() {
  const { isAuthenticated, user } = useAuthStore()
  const { logout } = useAuth()
  const cartCount = useCartStore((s) => s.items.reduce((a, b) => a + b.quantity, 0))

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-bold text-blue-600">Hooli</Link>
        <div className="flex items-center gap-4">
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <Link to="/cart" className="relative hover:text-blue-600">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/orders" className="hover:text-blue-600">Orders</Link>
              <span className="text-sm text-gray-500">Hi, {user?.name}</span>
              <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
