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
  totalItems: number
  totalPrice: number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
  addItem: (product) => {
    const items = get().items
    const existing = items.find((i) => i.product._id === product._id)
    let newItems: CartItem[]
    if (existing) {
      newItems = items.map((i) =>
        i.product._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
      )
    } else {
      newItems = [...items, { product, quantity: 1 }]
    }
    localStorage.setItem("cart", JSON.stringify(newItems))
    set({ items: newItems })
  },
  removeItem: (productId) => {
    const newItems = get().items.filter((i) => i.product._id !== productId)
    localStorage.setItem("cart", JSON.stringify(newItems))
    set({ items: newItems })
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }
    const newItems = get().items.map((i) =>
      i.product._id === productId ? { ...i, quantity } : i
    )
    localStorage.setItem("cart", JSON.stringify(newItems))
    set({ items: newItems })
  },
  clearCart: () => {
    localStorage.removeItem("cart")
    set({ items: [] })
  },
  get totalItems() {
    return get().items.reduce((a, b) => a + b.quantity, 0)
  },
  get totalPrice() {
    return get().items.reduce((a, b) => a + b.product.price * b.quantity, 0)
  },
}))
