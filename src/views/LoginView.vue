<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

// Form state
const form = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

// UI state
const isLoading = ref(false)
const showPassword = ref(false)
const error = ref('')
const success = ref('')

// Form validation
const emailError = ref('')
const passwordError = ref('')

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateForm = () => {
  emailError.value = ''
  passwordError.value = ''
  error.value = ''

  if (!form.email) {
    emailError.value = 'Email wajib diisi'
    return false
  }

  if (!validateEmail(form.email)) {
    emailError.value = 'Format email tidak valid'
    return false
  }

  if (!form.password) {
    passwordError.value = 'Password wajib diisi'
    return false
  }

  if (form.password.length < 6) {
    passwordError.value = 'Password minimal 6 karakter'
    return false
  }

  return true
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true
  error.value = ''

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate success/error randomly for demo
    if (Math.random() > 0.3) {
      success.value = 'Login berhasil! Mengalihkan...'
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      throw new Error('Email atau password salah')
    }
  } catch (err: any) {
    error.value = err.message || 'Terjadi kesalahan, silakan coba lagi'
  } finally {
    isLoading.value = false
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Social login handlers
const handleGoogleLogin = () => {
  console.log('Google login clicked')
}

const handleFacebookLogin = () => {
  console.log('Facebook login clicked')
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center p-4"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-violet-200/20 to-purple-200/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center space-x-3 mb-4">
          <div
            class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <span class="text-white font-bold text-xl">T</span>
          </div>
          <div
            class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
          >
            TokoVue
          </div>
        </div>
      </div>
      <Card class="backdrop-blur-sm border-0 shadow-2xl shadow-blue-500/10">
        <CardHeader class="space-y-2 text-center pb-6">
          <CardTitle class="text-2xl font-bold text-gray-900">Masuk ke Akun</CardTitle>
          <CardDescription class="text-gray-600">
            Masukkan email dan password untuk mengakses dashboard Anda
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <Alert v-if="success" class="border-green-200 bg-green-50 text-green-800">
            <AlertDescription class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              {{ success }}
            </AlertDescription>
          </Alert>
          <Alert v-if="error" class="border-red-200 bg-red-50 text-red-800">
            <AlertDescription class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              {{ error }}
            </AlertDescription>
          </Alert>
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div class="space-y-2">
              <Label for="email" class="text-sm font-semibold text-gray-700"> Email Address </Label>
              <div class="relative">
                <Input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="nama@email.com"
                  :class="[
                    'pl-11 transition-all duration-300',
                    emailError
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                      : 'focus:border-blue-500 focus:ring-blue-500/20',
                  ]"
                  :disabled="isLoading"
                />
                <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    ></path>
                  </svg>
                </div>
              </div>
              <p v-if="emailError" class="text-sm text-red-600 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                {{ emailError }}
              </p>
            </div>
            <div class="space-y-2">
              <Label for="password" class="text-sm font-semibold text-gray-700"> Password </Label>
              <div class="relative">
                <Input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Masukkan password"
                  :class="[
                    'pl-11 pr-11 transition-all duration-300',
                    passwordError
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                      : 'focus:border-blue-500 focus:ring-blue-500/20',
                  ]"
                  :disabled="isLoading"
                />
                <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </div>
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  :disabled="isLoading"
                >
                  <svg
                    v-if="showPassword"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    ></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                </button>
              </div>
              <p v-if="passwordError" class="text-sm text-red-600 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                {{ passwordError }}
              </p>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <Checkbox id="remember" v-model:checked="form.rememberMe" :disabled="isLoading" />
                <Label for="remember" class="text-sm text-gray-600 cursor-pointer">
                  Ingat saya
                </Label>
              </div>
              <a
                href="#"
                class="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Lupa password?
              </a>
            </div>
            <Button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold py-3 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
            >
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isLoading ? 'Memproses...' : 'Masuk ke Dashboard' }}
            </Button>
          </form>
          <div class="relative my-6 flex items-center justify-between">
            <div class="w-60 border-t border-gray-300"></div>
            <div class="relative flex justify-center text-sm w-full">
              <span class="px-4 text-gray-500 font-medium">Atau masuk dengan</span>
            </div>
            <div class="w-60 border-t border-gray-300"></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              @click="handleGoogleLogin"
              :disabled="isLoading"
              class="font-medium border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              @click="handleFacebookLogin"
              :disabled="isLoading"
              class="font-medium border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
              Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter class="border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
          <p class="text-center text-sm text-gray-600 w-full">
            Belum punya akun?
            <RouterLink
              to="/register"
              class="font-semibold text-blue-600 hover:text-blue-700 transition-colors ml-1"
            >
              Daftar sekarang
            </RouterLink>
          </p>
        </CardFooter>
      </Card>
      <p class="text-center text-sm text-gray-500 mt-8">
        © 2024 TokoVue. Semua hak dilindungi undang-undang.
      </p>
    </div>
  </div>
</template>

<style scoped>
.focus\:ring-blue-500\/20:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.focus\:ring-red-500\/20:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.bg-gradient-to-br {
  background-attachment: fixed;
}

* {
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow,
    transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
