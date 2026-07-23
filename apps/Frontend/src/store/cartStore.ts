import { create } from "zustand"
import type { Product } from "../types"

interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

function save(items: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(items))
}

function load(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]")
  } catch {
    return []
  }
}

export const useCartStore = create<CartState>((set) => ({
  items: load(),
  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product._id === product._id)
      const items = existing
        ? state.items.map((i) =>
            i.product._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { product, quantity: 1 }]
      save(items)
      return { items }
    }),
  removeItem: (productId) =>
    set((state) => {
      const items = state.items.filter((i) => i.product._id !== productId)
      save(items)
      return { items }
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        const items = state.items.filter((i) => i.product._id !== productId)
        save(items)
        return { items }
      }
      const items = state.items.map((i) =>
        i.product._id === productId ? { ...i, quantity } : i
      )
      save(items)
      return { items }
    }),
  clearCart: () => {
    localStorage.removeItem("cart")
    set({ items: [] })
  },
}))
