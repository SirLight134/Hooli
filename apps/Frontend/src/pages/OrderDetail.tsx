import { useParams, Link } from "react-router-dom"
import { useOrder } from "../hooks/useOrders"

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: order, isLoading, error } = useOrder(id!)

  if (isLoading)
    return (
      <div className="max-w-3xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface-secondary rounded-2xl w-48" />
          <div className="h-6 bg-surface-secondary rounded-2xl w-24" />
          <div className="card-outer">
            <div className="card-inner p-6 space-y-3">
              <div className="h-4 bg-surface-secondary rounded-2xl w-full" />
              <div className="h-4 bg-surface-secondary rounded-2xl w-3/4" />
              <div className="h-4 bg-surface-secondary rounded-2xl w-1/2" />
            </div>
          </div>
        </div>
      </div>
    )
  if (error || !order) return <p className="text-center py-10 text-status-error">Order not found</p>

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/orders"
        className="text-accent-primary hover:text-accent-hover text-body-sm font-medium inline-flex items-center gap-1 mb-6 focus-visible:outline-2 focus-visible:outline-accent-primary"
      >
        ← Back to Orders
      </Link>

      <h1 className="text-h1 mb-2">Order #{order._id.slice(-8)}</h1>
      <span className={`status-badge status-badge--${order.status.toLowerCase()} mb-8 inline-block`}>
        {order.status}
      </span>

      <div className="card-outer mb-6">
        <div className="card-inner p-6">
          <h2 className="text-h2 mb-4">Items</h2>
          {order.products?.map((item, idx) => (
            <div key={idx} className="flex justify-between py-3 border-b border-border-default last:border-b-0">
              <span className="text-body">
                {item.product?.name || "Product"} <span className="text-text-tertiary">×{item.quantity}</span>
              </span>
              <span className="text-body font-medium">${(item.priceAtPurchase * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between mt-4 pt-4 border-t border-border-default">
            <span className="text-h4">Total</span>
            <span className="text-h4">${order.total?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {order.shippingAddress && (
        <div className="card-outer mb-6">
          <div className="card-inner p-6">
            <h2 className="text-h2 mb-4">Shipping Address</h2>
            <p className="text-body text-text-primary">{order.shippingAddress.street}</p>
            <p className="text-body text-text-primary">
              {order.shippingAddress.city}, {order.shippingAddress.zipCode}
            </p>
            <p className="text-body text-text-primary">{order.shippingAddress.country}</p>
          </div>
        </div>
      )}
    </div>
  )
}
