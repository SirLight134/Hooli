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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        {items.map((item) => (
          <div key={item.product._id} className="flex justify-between py-2 border-b">
            <span>{item.product.name} x{item.quantity}</span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Street</label>
            <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })}
              className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input type="text" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })}
              className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Zip Code</label>
            <input type="text" value={address.zipCode} onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
              className="w-full border rounded px-3 py-2" required />
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition text-lg">
          {loading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
        </button>
      </form>
    </div>
  )
}
