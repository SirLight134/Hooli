import { Link } from "react-router-dom"
import type { Order } from "../../types"

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-indigo-100 text-indigo-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
}

export default function OrderCard({ order }: { order: Order }) {
  return (
    <Link to={`/orders/${order._id}`} className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">Order #{order._id.slice(-8)}</span>
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[order.status] || "bg-gray-100"}`}>
          {order.status}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">{order.products?.length || 0} item(s)</span>
        <span className="font-bold">${order.total?.toFixed(2)}</span>
      </div>
      <p className="text-xs text-gray-400 mt-2">{new Date(order.createdAt).toLocaleDateString()}</p>
    </Link>
  )
}
