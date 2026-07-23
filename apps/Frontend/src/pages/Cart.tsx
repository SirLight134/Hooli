import { Link } from "react-router-dom"
import { useCartStore } from "../store/cartStore"

const ShoppingCartIcon = () => (
  <svg
    className="w-16 h-16 text-tertiary"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
)

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <ShoppingCartIcon />
        <h1 className="text-h1 text-primary">Your Cart is Empty</h1>
        <Link
          to="/products"
          className="text-accent-primary hover:text-accent-hover text-body focus-visible:outline-2 focus-visible:outline-accent-primary rounded transition-colors"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      <h1 className="text-h1 text-primary mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product._id} className="card-outer">
              <div className="card-inner">
                <div className="flex gap-4 p-4">
                  <img
                    src={item.product.images?.[0] || "https://placehold.co/100"}
                    alt={item.product.name}
                    className="w-24 h-24 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${item.product._id}`}
                      className="text-body font-semibold text-primary hover:text-accent-primary focus-visible:outline-2 focus-visible:outline-accent-primary rounded transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-body-sm text-secondary mt-1">
                      ${item.product.price}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="btn-secondary w-8 h-8 p-0 text-body-sm focus-visible:outline-2 focus-visible:outline-accent-primary"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-body text-primary w-8 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="btn-secondary w-8 h-8 p-0 text-body-sm focus-visible:outline-2 focus-visible:outline-accent-primary"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.product._id)}
                        className="ml-auto text-status-error hover:text-status-error/80 text-body-sm focus-visible:outline-2 focus-visible:outline-accent-primary rounded transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-body font-semibold text-primary">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="card-outer sticky top-24">
            <div className="card-inner p-6 space-y-4">
              <h2 className="text-h2 text-primary">Order Summary</h2>
              <div className="flex justify-between text-body">
                <span className="text-secondary">Subtotal</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-body">
                <span className="text-secondary">Shipping</span>
                <span className="text-primary">Free</span>
              </div>
              <hr className="border-default" />
              <div className="flex justify-between text-h4">
                <span className="text-primary">Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                className="btn-primary w-full text-center focus-visible:outline-2 focus-visible:outline-accent-primary"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
