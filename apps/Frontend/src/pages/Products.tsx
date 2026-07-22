import ProductCard from "../components/product/ProductCard"
import { useProducts } from "../hooks/useProducts"

export default function Products() {
  const { data: products, isLoading, error } = useProducts()

  if (isLoading) {
    return <div className="text-center py-10">Loading products...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Failed to load products</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      {!products || products.length === 0 ? (
        <p className="text-gray-500">No products available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
