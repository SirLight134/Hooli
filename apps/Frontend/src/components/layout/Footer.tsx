import { Link } from "react-router-dom"

const quickLinks = [
  { to: "/products", label: "All Products" },
  { to: "/categories", label: "Categories" },
  { to: "/deals", label: "Special Offers" },
  { to: "/cart", label: "Shopping Cart" },
]

const customerService = [
  { to: "/help", label: "Help Center" },
  { to: "/shipping", label: "Shipping Info" },
  { to: "/returns", label: "Returns & Exchanges" },
  { to: "/contact", label: "Contact Us" },
]

const legal = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
  { to: "/cookies", label: "Cookie Policy" },
]

export default function Footer() {
  return (
    <footer className="bg-surface-brand text-text-inverse mt-auto">
      <div className="max-w-content mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-block text-2xl font-bold bg-gradient-to-r from-accent-primary to-accent-hover bg-clip-text text-transparent mb-4"
            >
              Hooli
            </Link>
            <p className="text-text-secondary text-body-sm leading-relaxed max-w-xs">
              A premium multi-vendor marketplace connecting you with the best products from around the world. Shop with confidence, sell with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-caption font-semibold text-text-inverse/80 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-text-secondary text-body-sm hover:text-accent-primary transition-colors duration-150
                      focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-caption font-semibold text-text-inverse/80 uppercase tracking-wider mb-4">
              Customer Service
            </h4>
            <ul className="flex flex-col gap-3">
              {customerService.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-text-secondary text-body-sm hover:text-accent-primary transition-colors duration-150
                      focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-caption font-semibold text-text-inverse/80 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {legal.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-text-secondary text-body-sm hover:text-accent-primary transition-colors duration-150
                      focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-content mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-tertiary text-caption">
            &copy; {new Date().getFullYear()} Hooli. All rights reserved.
          </p>
          <p className="text-text-tertiary text-caption">
            Built with care for sellers and buyers.
          </p>
        </div>
      </div>
    </footer>
  )
}
