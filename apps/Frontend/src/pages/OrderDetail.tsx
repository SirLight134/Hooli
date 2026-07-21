import { useParams } from "react-router-dom"
import { useOrder } from "../hooks/useOrders"

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-indigo-100 text-indigo-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
}

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: order, isLoading, error } = useOrder(id!)

  if (isLoading) return <div className="text-center py-10 text-lg">Loading...</div>
  if (error || !order) return <div className="text-center py-10 text-red-500">Order not found</div>

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Order #{order._id.slice(-8)}</h1>
      <span className={`inline-block px-3 py-1 rounded text-sm font-medium mb-6 ${statusColors[order.status]}`}>
        {order.status}
      </span>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        {order.products?.map((item, idx) => (
          <div key={idx} className="flex justify-between py-2 border-b">
            <span>{item.product?.name || "Product"} x{item.quantity}</span>
            <span>${(item.priceAtPurchase * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>${order.total?.toFixed(2)}</span>
        </div>
      </div>

      {order.shippingAddress && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <p>{order.shippingAddress.street}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
          <p>{order.shippingAddress.country}</p>
        </div>
      )}
    </div>
  )
}
