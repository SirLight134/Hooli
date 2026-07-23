import { Link } from "react-router-dom"
import { useProducts } from "../hooks/useProducts"
import ProductCard from "../components/product/ProductCard"

export default function Home() {
  const { data: products, isLoading } = useProducts()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-brand py-20 md:py-24">
        {/* Purple glow decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(124,58,237,0.08)_0%,transparent_70%)]" />

        {/* Geometric accents */}
        <div className="absolute top-16 right-16 w-40 h-40 border border-accent-primary/10 rounded-full" />
        <div className="absolute bottom-16 left-16 w-28 h-28 border border-accent-primary/10 rotate-45" />
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-accent-primary/20 rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-accent-primary/20 rounded-full" />

        <div className="relative max-w-content mx-auto px-6 text-center">
          <h1 className="text-display text-text-inverse mb-4">
            Discover Premium Products
          </h1>
          <p className="text-body-lg text-text-tertiary max-w-2xl mx-auto mb-10">
            Curated collection of high-quality products at unbeatable prices
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/products" className="btn-primary">
              Shop Now
            </Link>
            <Link
              to="/products"
              className="btn-secondary text-text-inverse border-white/20 hover:border-accent-primary hover:bg-accent-subtle/10"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20 max-w-content mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-h2">Featured Products</h2>
          <Link
            to="/products"
            className="text-accent-primary hover:text-accent-hover transition-colors duration-micro font-medium"
          >
            View All
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-surface-secondary rounded-2xl h-80"
              />
            ))}
          </div>
        ) : !products || products.length === 0 ? (
          <p className="text-text-tertiary text-center py-16">
            No featured products available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product, index) => (
              <div
                key={product._id}
                className="animate-fade-up opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}