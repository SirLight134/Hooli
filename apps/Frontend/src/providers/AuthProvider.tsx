import { useEffect, type ReactNode } from "react"
import { useAuthStore } from "../store/authStore"
import { getMeApi } from "../api/auth"

export function AuthProvider({ children }: { children: ReactNode }) {
  const { token, user, setUser, logout } = useAuthStore()

  useEffect(() => {
    if (token && !user) {
      getMeApi()
        .then(setUser)
        .catch(() => logout())
    }
  }, [])

  return <>{children}</>
}
