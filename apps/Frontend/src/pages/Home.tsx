import { Link } from "react-router-dom"
import { useProducts } from "../hooks/useProducts"
import ProductCard from "../components/product/ProductCard"

export default function Home() {
  const { data: products, isLoading } = useProducts()

  return (
    <div>
      <section className="text-center py-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-12 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Hooli</h1>
        <p className="text-xl mb-8">Discover amazing products at great prices</p>
        <Link to="/products" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Shop Now
        </Link>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-blue-600 hover:underline">View All</Link>
        </div>
        {isLoading ? (
          <div className="text-center py-10">Loading products...</div>
        ) : !products || products.length === 0 ? (
          <p className="text-gray-500">No products available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
