import { describe, it, expect, beforeEach } from "vitest"
import { useCartStore } from "../store/cartStore"

describe("cartStore", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
    localStorage.clear()
  })

  const mockProduct = {
    _id: "prod1",
    name: "Test Product",
    description: "A test product",
    price: 29.99,
    stock: 10,
    images: [],
    category: "Test",
    brand: "Test",
    discount: 0,
    seller: "seller1",
    tags: [],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  }

  it("should add an item to the cart", () => {
    useCartStore.getState().addItem(mockProduct)
    const items = useCartStore.getState().items
    expect(items).toHaveLength(1)
    expect(items[0].product._id).toBe("prod1")
    expect(items[0].quantity).toBe(1)
  })

  it("should increment quantity when adding same product", () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().addItem(mockProduct)
    const items = useCartStore.getState().items
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(2)
  })

  it("should remove an item from the cart", () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().removeItem("prod1")
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it("should clear the cart", () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().clearCart()
    expect(useCartStore.getState().items).toHaveLength(0)
  })
  it("should update quantity", () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().updateQuantity("prod1", 5)
    expect(useCartStore.getState().items[0].quantity).toBe(5)
  })

  it("should remove item when quantity is set to 0", () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().updateQuantity("prod1", 0)
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it("should persist to localStorage", () => {
    useCartStore.getState().addItem(mockProduct)
    const stored = JSON.parse(localStorage.getItem("cart") || "[]")
    expect(stored).toHaveLength(1)
    expect(stored[0].product._id).toBe("prod1")
  })
})
