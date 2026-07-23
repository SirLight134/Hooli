import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import { useAuth } from "../../hooks/useAuth"
import { useCartStore } from "../../store/cartStore"
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react"

export default function Navbar() {
  const { isAuthenticated, user } = useAuthStore()
  const { logout } = useAuth()
  const cartCount = useCartStore((s) => s.items.reduce((a, b) => a + b.quantity, 0))
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMobileMenuOpen])

  const navLinks = [
    { to: "/products", label: "Products" },
    { to: "/orders", label: "Orders", authOnly: true },
  ]

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 flex justify-center"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Nav Pill */}
      <div
        className={`flex items-center justify-between w-full max-w-content mx-4 md:mx-6 px-4 md:px-6 h-14 md:h-16 rounded-pill transition-all duration-300 ease-out mt-3 md:mt-4 ${isScrolled
          ? "glass-pill shadow-default"
          : "bg-transparent shadow-none"
          }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-accent-primary to-accent-hover bg-clip-text text-transparent shrink-0"
          aria-label="Hooli Home"
        >
          Hooli
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks
            .filter((l) => !l.authOnly || (l.authOnly && isAuthenticated))
            .map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-text-secondary hover:text-accent-primary transition-colors duration-150 text-body-sm font-medium
                  after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-accent-primary after:transition-all after:duration-200 hover:after:w-full
                  focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-4 rounded-sm"
              >
                {link.label}
              </Link>
            ))}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-text-secondary hover:text-accent-primary transition-colors duration-150 p-1.5
              focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2 rounded-lg"
            aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent-primary text-text-inverse text-[11px] font-semibold rounded-pill min-w-[20px] h-5 flex items-center justify-center px-1 shadow-subtle">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          <div className="flex items-center gap-3 pl-2 border-l border-border-default">
            {isAuthenticated ? (
              <>
                <span className="text-text-secondary text-caption flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="btn-secondary text-caption px-3 py-1.5 flex items-center gap-1.5
                    focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-text-secondary hover:text-accent-primary transition-colors duration-150 text-body-sm font-medium
                    focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2 rounded-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-caption px-4 py-1.5
                    focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-text-secondary hover:text-accent-primary transition-colors duration-150
            focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2 rounded-lg"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-out ${isMobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-surface-primary/95 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative z-10 flex flex-col items-center justify-start gap-8 pt-28 px-6">
          <Link
            to="/products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-text-primary text-h3 font-medium hover:text-accent-primary transition-colors duration-150
              focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2 rounded-sm animate-fade-up"
            style={{ animationDelay: "50ms" }}
          >
            Products
          </Link>

          <Link
            to="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-text-primary text-h3 font-medium hover:text-accent-primary transition-colors duration-150 flex items-center gap-3
              focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2 rounded-sm animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            <ShoppingCart className="w-6 h-6" />
            Cart
            {cartCount > 0 && (
              <span className="bg-accent-primary text-text-inverse text-caption font-semibold rounded-pill px-2.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated && (
            <Link
              to="/orders"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-text-primary text-h3 font-medium hover:text-accent-primary transition-colors duration-150
                focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2 rounded-sm animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              Orders
            </Link>
          )}

          <div className="w-full max-w-xs border-t border-border-default pt-8 mt-2 animate-fade-up flex flex-col items-center gap-4"
            style={{ animationDelay: "200ms" }}
          >
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-text-secondary text-body">
                  <User className="w-5 h-5" />
                  <span>{user?.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="btn-secondary w-full flex items-center justify-center gap-2 py-2.5
                    focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-secondary w-full text-center py-2.5
                    focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary w-full text-center py-2.5
                    focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
