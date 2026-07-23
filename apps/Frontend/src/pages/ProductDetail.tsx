import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCartStore } from "../store/cartStore"
import { useProduct } from "../hooks/useProducts"

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const [quantity, setQuantity] = useState(1)
  const { data: product, isLoading, error } = useProduct(id || "")

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Image skeleton */}
        <div className="animate-pulse">
          <div className="card-outer rounded-2xl">
            <div className="card-inner">
              <div className="aspect-square bg-surface-secondary" />
            </div>
          </div>
        </div>
        {/* Content skeleton */}
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-surface-secondary rounded w-3/4" />
          <div className="h-4 bg-surface-secondary rounded w-1/4" />
          <div className="space-y-3">
            <div className="h-4 bg-surface-secondary rounded w-full" />
            <div className="h-4 bg-surface-secondary rounded w-5/6" />
            <div className="h-4 bg-surface-secondary rounded w-2/3" />
          </div>
          <div className="h-8 bg-surface-secondary rounded w-1/3" />
          <div className="flex gap-4">
            <div className="h-10 bg-surface-secondary rounded-full w-10" />
            <div className="h-10 bg-surface-secondary rounded-full w-10" />
          </div>
          <div className="flex gap-4 pt-2">
            <div className="h-12 bg-surface-secondary rounded-full flex-1" />
            <div className="h-12 bg-surface-secondary rounded-full flex-1" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-status-error text-body">Product not found</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
  }

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    navigate("/cart")
  }

  return (
    <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
      {/* Image - Double-bezel card */}
      <div className="card-outer rounded-2xl">
        <div className="card-inner overflow-hidden">
          <img
            src={product.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <div>
          <h1 className="text-h1 mb-2">{product.name}</h1>
          <p className="text-body text-text-secondary">{product.brand}</p>
        </div>

        <p className="text-body text-text-secondary leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-4">
          <span className="text-h2 text-accent-primary">
            ${product.price}
          </span>
          {product.discount > 0 && (
            <span className="status-badge status-badge--processing">
              -{product.discount}% off
            </span>
          )}
        </div>

        {/* Quantity selector */}
        <div className="flex items-center gap-4">
          <span className="text-body font-medium">Quantity:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="btn-secondary w-10 h-10 p-0 flex items-center justify-center text-lg rounded-full focus-visible:outline-2 focus-visible:outline-accent-primary"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-12 text-center text-body font-medium tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="btn-secondary w-10 h-10 p-0 flex items-center justify-center text-lg rounded-full focus-visible:outline-2 focus-visible:outline-accent-primary"
              disabled={quantity >= product.stock}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <span className="text-body-sm text-text-tertiary">
            {product.stock} available
          </span>
        </div>

        {/* CTAs */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn-primary flex-1 text-base"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="btn-secondary flex-1 text-base"
          >
            Buy Now
          </button>
        </div>

        {/* Stock indicator */}
        <div className="pt-2">
          {product.stock > 0 && product.stock <= 5 ? (
            <p className="text-body-sm text-status-warning">
              Only {product.stock} left in stock
            </p>
          ) : product.stock === 0 ? (
            <p className="text-body-sm text-status-error">
              Out of stock
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
