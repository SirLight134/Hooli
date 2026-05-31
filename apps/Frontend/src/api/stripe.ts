import apiClient from "./client"

export const createCheckoutSessionApi = async (products: { productId: string; price_data: { currency: string; product_data: { name: string; images: string[] }; unit_amount: number }; quantity: number }[], orderId?: string, userId?: string) => {
  const { data } = await apiClient.post<{ url: string; sessionId: string }>("/stripe/create-checkout-session", { products, orderId, userId })
  return data
}
