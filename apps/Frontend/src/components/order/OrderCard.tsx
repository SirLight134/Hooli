import { Link } from "react-router-dom"
import type { Order } from "../../types"

export default function OrderCard({ order }: { order: Order }) {
  return (
    <Link
      to={`/orders/${order._id}`}
      className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2"
    >
      <div className="card-outer group">
        <div className="card-inner p-4 transition-all duration-standard ease-out-expo group-hover:-translate-y-0.5 group-hover:shadow-card-hover">
          <div className="flex justify-between items-center mb-2">
            <span className="text-caption text-text-tertiary">Order #{order._id.slice(-8)}</span>
            <span className={`status-badge status-badge--${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-body-sm text-text-secondary">{order.products?.length || 0} item(s)</span>
            <span className="font-semibold text-accent-primary">${order.total?.toFixed(2)}</span>
          </div>
          <p className="text-caption text-text-tertiary mt-2">{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </Link>
  )
}
