import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getProductsApi, getProductApi, createProductApi, updateProductApi, deleteProductApi } from "../api/products"
import { QUERY_KEYS } from "../lib/constants"

export function useProducts(params?: Record<string, string>) {
  return useQuery({
    queryKey: [QUERY_KEYS.products, params],
    queryFn: () => getProductsApi(params),
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.product, id],
    queryFn: () => getProductApi(id),
    enabled: !!id,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProductApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.products] }),
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<any> }) => updateProductApi(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.products] }),
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.products] }),
  })
}
