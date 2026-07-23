import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setError("")
      await login(email, password)
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 md:mt-16 px-4">
      <div className="card-outer">
        <div className="card-inner p-8">
          <div className="text-center mb-6">
            <span className="bg-gradient-to-r from-accent-primary to-accent-hover bg-clip-text text-transparent text-h3 font-bold">
              Hooli
            </span>
          </div>

          <h2 className="text-h2 text-center text-text-primary mb-8">Welcome back</h2>

          {error && (
            <div className="bg-status-error/10 border border-status-error/20 rounded-xl p-4 mb-5">
              <p className="text-status-error text-body-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-caption font-medium text-text-secondary mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border-default bg-surface-primary px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary focus-visible:outline-2 focus-visible:outline-accent-primary transition-colors duration-150"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-caption font-medium text-text-secondary mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border-default bg-surface-primary px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary focus-visible:outline-2 focus-visible:outline-accent-primary transition-colors duration-150"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full py-3">
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-body-sm text-text-secondary">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-accent-primary hover:text-accent-hover font-medium focus-visible:outline-2 focus-visible:outline-accent-primary rounded-sm"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
