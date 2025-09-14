import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const savedUser = localStorage.getItem('auth-user')
  const user = ref<User | null>(savedUser ? JSON.parse(savedUser) : null)
  const isLoading = ref(false)

  watch(user, (newUser) => {
    if (newUser) {
      localStorage.setItem('auth-user', JSON.stringify(newUser))
    } else {
      localStorage.removeItem('auth-user')
    }
  })

  const isAuthenticated = computed(() => {
    return user.value !== null
  })

  const login = async (email: string, password: string) => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      user.value = {
        id: 1,
        name: 'John Doe',
        email: email,
        avatar: 'https://placehold.co/100x100',
        password,
      }

      return { success: true }
    } catch {
      return { success: false, error: 'Login failed' }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
  }

  const register = async (name: string, email: string, password: string) => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      user.value = {
        id: 1,
        name: name,
        email: email,
        avatar: 'https://placehold.co/100x100',
        password,
      }

      return { success: true }
    } catch {
      return { success: false, error: 'Registration failed' }
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
  }
})
