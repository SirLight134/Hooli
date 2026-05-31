import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getOrdersApi, getOrderApi, updateOrderStatusApi } from "../api/orders"
import { QUERY_KEYS } from "../lib/constants"

export function useOrders() {
  return useQuery({
    queryKey: [QUERY_KEYS.orders],
    queryFn: getOrdersApi,
  })
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.order, id],
    queryFn: () => getOrderApi(id),
    enabled: !!id,
  })
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateOrderStatusApi(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.orders] })
    },
  })
}
