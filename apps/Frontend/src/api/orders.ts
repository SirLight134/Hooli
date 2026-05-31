import apiClient from "./client"
import type { Order } from "../types"

export const createOrderApi = async (order: { items: { productId: string; quantity: number; price: number }[]; shippingAddress: { street: string; city: string; country: string; zipCode: string } }) => {
  const { data } = await apiClient.post<Order>("/orders/create-order", order)
  return data
}

export const getOrdersApi = async () => {
  const { data } = await apiClient.get<Order[]>("/orders/")
  return data
}

export const getOrderApi = async (id: string) => {
  const { data } = await apiClient.get<Order>(`/orders/${id}`)
  return data
}

export const updateOrderStatusApi = async (id: string, status: string) => {
  const { data } = await apiClient.put<Order>(`/orders/${id}`, { status })
  return data
}
