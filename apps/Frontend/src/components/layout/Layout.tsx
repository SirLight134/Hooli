import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-primary text-text-primary">
      <Navbar />
      <main className="flex-1 w-full max-w-content mx-auto px-6 pt-24 pb-8 md:pt-28 md:pb-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
