import apiClient from "./client"
import type { AuthResponse } from "../types"

export const loginApi = async (email: string, password: string) => {
  const { data } = await apiClient.post<AuthResponse>("/auth/login", { email, password })
  return data
}

export const registerApi = async (name: string, email: string, password: string) => {
  const { data } = await apiClient.post<AuthResponse>("/auth/register", { name, email, password })
  return data
}

export const logoutApi = async () => {
  await apiClient.post("/auth/logout")
}

export const getMeApi = async () => {
  const { data } = await apiClient.get("/auth/me")
  return data.user
}
