import apiClient from "./client"
import type { Product } from "../types"

export const getProductsApi = async (params?: Record<string, string>) => {
  const { data } = await apiClient.get<{ message: string; products: Product[] }>("/products/", { params })
  return data.products
}

export const getProductApi = async (id: string) => {
  const { data } = await apiClient.get<{ message: string; product: Product }>(`/products/${id}`)
  return data.product
}

export const createProductApi = async (product: Partial<Product>) => {
  const { data } = await apiClient.post<{ message: string; product: Product }>("/products/", product)
  return data.product
}

export const updateProductApi = async (id: string, product: Partial<Product>) => {
  const { data } = await apiClient.put<any>(`/products/${id}`, product)
  return data
}

export const deleteProductApi = async (id: string) => {
  await apiClient.delete(`/products/${id}`)
}
