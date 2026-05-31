import { Link } from "react-router-dom"
import { useCartStore } from "../store/cartStore"

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link to="/products" className="text-blue-600 hover:underline">Browse Products</Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product._id} className="flex gap-4 bg-white p-4 rounded-lg shadow">
              <img
                src={item.product.images?.[0] || "https://placehold.co/100"}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <Link to={`/products/${item.product._id}`} className="font-semibold hover:text-blue-600">
                  {item.product.name}
                </Link>
                <p className="text-gray-500 text-sm">${item.product.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    className="border px-2 py-1 rounded hover:bg-gray-100">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="border px-2 py-1 rounded hover:bg-gray-100">+</button>
                  <button onClick={() => removeItem(item.product._id)}
                    className="ml-4 text-red-500 text-sm hover:underline">Remove</button>
                </div>
              </div>
              <div className="text-right font-semibold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <hr className="mb-4" />
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
