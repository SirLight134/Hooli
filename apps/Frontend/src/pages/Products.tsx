import ProductCard from "../components/product/ProductCard"
import { useProducts } from "../hooks/useProducts"

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="card-outer">
            <div className="card-inner overflow-hidden">
              <div className="h-48 bg-surface-secondary" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-surface-secondary rounded w-3/4" />
                <div className="h-3 bg-surface-secondary rounded w-1/2" />
                <div className="flex gap-2">
                  <div className="h-5 bg-surface-secondary rounded w-1/4" />
                  <div className="h-4 bg-surface-secondary rounded w-1/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Products() {
  const { data: products, isLoading, error } = useProducts()

  if (isLoading) {
    return (
      <div>
        <h1 className="text-h1 mb-8">Products</h1>
        <LoadingSkeleton />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h1 className="text-h1 mb-8">Products</h1>
        <p className="text-status-error">Failed to load products. Please try again later.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-h1 mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!products || products.length === 0 ? (
          <p className="text-text-tertiary col-span-full">No products available yet.</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  )
}
