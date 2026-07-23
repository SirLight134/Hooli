import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useCartStore } from "../store/cartStore"
import { createCheckoutSessionApi } from "../api/stripe"
import { useAuthStore } from "../store/authStore"

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCartStore()
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [address, setAddress] = useState({ street: "", city: "", country: "", zipCode: "" })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) {
      navigate("/login")
      return
    }
    setLoading(true)
    setError("")
    try {
      const products = items.map((i) => ({
        productId: i.product._id,
        price_data: {
          currency: "usd",
          product_data: { name: i.product.name, images: i.product.images },
          unit_amount: Math.round(i.product.price * 100),
        },
        quantity: i.quantity,
      }))
      const session = await createCheckoutSessionApi(products, "", user._id)
      clearCart()
      window.location.href = session.url
    } catch (err: any) {
      setError(err.response?.data?.message || "Checkout failed")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    navigate("/cart")
    return null
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-h1 font-bold text-text-primary mb-8">Checkout</h1>

      {error && (
        <div className="bg-status-error/10 border border-status-error/20 rounded-xl p-4 text-status-error text-body-sm mb-6">
          {error}
        </div>
      )}

      {/* Order Items */}
      <div className="card-outer mb-6">
        <div className="card-inner p-6">
          <h2 className="text-h2 font-semibold text-text-primary mb-4">Order Items</h2>
          {items.map((item) => (
            <div key={item.product._id} className="flex justify-between py-3 border-b border-border-subtle last:border-b-0">
              <span className="text-body text-text-primary">{item.product.name} x{item.quantity}</span>
              <span className="text-body font-medium text-text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-h2 text-text-primary mt-4 pt-4 border-t border-border-default">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <form onSubmit={handleSubmit}>
        <div className="card-outer mb-6">
          <div className="card-inner p-6">
            <h2 className="text-h2 font-semibold text-text-primary mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-caption font-medium text-text-secondary mb-1.5">Street</label>
                <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full rounded-xl border border-border-default bg-surface-primary px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary focus-visible:outline-2 focus-visible:outline-accent-primary transition-colors duration-150" required />
              </div>
              <div>
                <label className="block text-caption font-medium text-text-secondary mb-1.5">City</label>
                <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full rounded-xl border border-border-default bg-surface-primary px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary focus-visible:outline-2 focus-visible:outline-accent-primary transition-colors duration-150" required />
              </div>
              <div>
                <label className="block text-caption font-medium text-text-secondary mb-1.5">Country</label>
                <input type="text" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  className="w-full rounded-xl border border-border-default bg-surface-primary px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary focus-visible:outline-2 focus-visible:outline-accent-primary transition-colors duration-150" required />
              </div>
              <div>
                <label className="block text-caption font-medium text-text-secondary mb-1.5">Zip Code</label>
                <input type="text" value={address.zipCode} onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                  className="w-full rounded-xl border border-border-default bg-surface-primary px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary focus-visible:outline-2 focus-visible:outline-accent-primary transition-colors duration-150" required />
              </div>
            </div>
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="btn-primary w-full py-3">
          {loading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
        </button>
      </form>
    </div>
  )
}