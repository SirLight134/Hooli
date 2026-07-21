import { useOrders } from "../hooks/useOrders"
import OrderCard from "../components/order/OrderCard"
import { useAuthStore } from "../store/authStore"
import { Navigate } from "react-router-dom"

export default function Orders() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const { data: orders, isLoading, error } = useOrders()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (isLoading) return <div className="text-center py-10 text-lg">Loading orders...</div>
  if (error) return <div className="text-center py-10 text-red-500">Failed to load orders</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {!orders || orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
