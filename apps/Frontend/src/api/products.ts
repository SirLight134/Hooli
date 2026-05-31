import apiClient from "./client"
import type { Product } from "../types"

export const getProductsApi = async (params?: Record<string, string>) => {
  const { data } = await apiClient.get<Product[]>("/products/", { params })
  return data
}

export const getProductApi = async (id: string) => {
  const { data } = await apiClient.get<Product>(`/products/${id}`)
  return data
}

export const createProductApi = async (product: Partial<Product>) => {
  const { data } = await apiClient.post<Product>("/products/", product)
  return data
}

export const updateProductApi = async (id: string, product: Partial<Product>) => {
  const { data } = await apiClient.put<Product>(`/products/${id}`, product)
  return data
}

export const deleteProductApi = async (id: string) => {
  await apiClient.delete(`/products/${id}`)
}
