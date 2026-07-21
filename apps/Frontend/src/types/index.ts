export interface User {
  _id: string
  name: string
  email: string
  role: "buyer" | "seller" | "admin"
  phone?: string
  avatar?: string
}

export interface Product {
  _id: string
  name: string
  description: string
  price: number
  stock: number
  images: string[]
  category: string
  brand: string
  discount: number
  seller: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface OrderItem {
  product: Product
  quantity: number
  priceAtPurchase: number
}

export interface Order {
  _id: string
  products: OrderItem[]
  buyer: string
  total: number
  status: "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  stripeSessionId: string
  shippingAddress: Address
  createdAt: string
  updatedAt: string
}

export interface Address {
  street: string
  city: string
  country: string
  zipCode: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface ApiError {
  message: string
  errors?: { field: string; message: string }[]
}
