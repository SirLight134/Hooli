import { useOrders } from "../hooks/useOrders"
import OrderCard from "../components/order/OrderCard"
import { useAuthStore } from "../store/authStore"
import { Navigate } from "react-router-dom"

export default function Orders() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const { data: orders, isLoading, error } = useOrders()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (isLoading)
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-surface-secondary rounded-2xl h-32" />
        ))}
      </div>
    )
  if (error) return <p className="text-center py-10 text-status-error">Failed to load orders</p>

  return (
    <div>
      <h1 className="text-h1 mb-8">My Orders</h1>
      {!orders || orders.length === 0 ? (
        <p className="text-text-tertiary text-center py-10">No orders yet.</p>
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
