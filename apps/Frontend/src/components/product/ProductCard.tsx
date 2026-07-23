import { Link } from "react-router-dom"
import type { Product } from "../../types"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product._id}`}
      className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2"
    >
      <div className="card-outer group">
        <div className="card-inner overflow-hidden transition-all duration-standard ease-out-expo group-hover:-translate-y-1 group-hover:shadow-card-hover">
          <div className="overflow-hidden">
            <img
              src={product.images?.[0] || "https://placehold.co/400x300?text=No+Image"}
              alt={product.name}
              className="object-cover w-full aspect-[4/3] transition-transform duration-emphasis ease-out-expo group-hover:scale-105"
            />
          </div>
          <div className="p-4 space-y-2">
            <h3 className="text-h3">{product.name}</h3>
            <p className="text-body-sm text-text-tertiary">{product.brand}</p>
            <div className="flex items-center gap-2">
              <span className="text-accent-primary font-semibold">${product.price}</span>
              {product.discount > 0 && (
                <span className="status-badge status-badge--warning">-{product.discount}%</span>
              )}
            </div>
            <span className="text-body-sm text-text-tertiary">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
