import { Link } from "react-router-dom"
import type { Product } from "../../types"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
        <img
          src={product.images?.[0] || "https://placehold.co/400x300?text=No+Image"}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 hover:text-blue-600">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold text-blue-600">${product.price}</span>
            {product.discount > 0 && (
              <span className="text-sm text-red-500">-{product.discount}%</span>
            )}
          </div>
          <span className="text-xs text-gray-400">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
      </div>
    </Link>
  )
}
