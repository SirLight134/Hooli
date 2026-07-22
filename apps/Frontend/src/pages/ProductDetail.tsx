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
    return <div className="text-center py-10">Loading product details...</div>
  }

  if (error || !product) {
    return <div className="text-center py-10 text-red-500">Product not found</div>
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
    <div className="grid md:grid-cols-2 gap-8">
      <img
        src={product.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
        alt={product.name}
        className="w-full rounded-lg shadow-md"
      />
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-500 mb-2">{product.brand}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl font-bold text-blue-600">${product.price}</span>
          {product.discount > 0 && (
            <span className="text-red-500">-{product.discount}% off</span>
          )}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-lg font-medium">Quantity:</span>
          <div className="flex items-center border rounded">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-gray-100 text-lg font-bold"
            >
              -
            </button>
            <span className="px-6 py-2 border-x text-lg font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="px-4 py-2 hover:bg-gray-100 text-lg font-bold"
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-500">({product.stock} available)</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 disabled:border-gray-400 disabled:text-gray-400 transition text-lg font-semibold"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="flex-1 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition text-lg font-semibold"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}
