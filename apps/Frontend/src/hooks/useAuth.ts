import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { loginApi, registerApi } from "../api/auth"

export function useAuth() {
  const { user, isAuthenticated, setAuth, logout: storeLogout } = useAuthStore()
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    const res = await loginApi(email, password)
    setAuth(res.user, res.token)
    navigate("/")
  }

  const register = async (name: string, email: string, password: string) => {
    const res = await registerApi(name, email, password)
    setAuth(res.user, res.token)
    navigate("/")
  }

  const logout = () => {
    storeLogout()
    navigate("/login")
  }

  return { user, isAuthenticated, login, register, logout }
}
