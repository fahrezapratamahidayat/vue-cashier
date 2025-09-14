<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const navItems = [
  { to: '/', label: 'Home', mobileBulletColor: 'blue-500' },
  { to: '/features', label: 'Fitur', mobileBulletColor: 'emerald-500' },
  { to: '/products', label: 'Produk', mobileBulletColor: 'violet-500' },
  { to: '/contact', label: 'Kontak', mobileBulletColor: 'orange-500' },
]

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()
const showUserDropdown = ref(false)
const showCartDropdown = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const isActive = (to: string) => {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

const toggleUserDropdown = () => {
  showUserDropdown.value = !showUserDropdown.value
}

const toggleCartDropdown = () => {
  showCartDropdown.value = !showCartDropdown.value
}

const handleLogout = () => {
  authStore.logout()
  showUserDropdown.value = false
}

// Close dropdowns when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.cart-dropdown') && !target.closest('.cart-button')) {
    showCartDropdown.value = false
  }
  if (!target.closest('.user-dropdown') && !target.closest('.user-button')) {
    showUserDropdown.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
      isScrolled
        ? 'backdrop-blur-xl bg-white/80 shadow-xl border-b border-gray-100/50'
        : 'backdrop-blur-md bg-white/70 shadow-lg',
    ]"
  >
    <div class="container mx-auto flex justify-between items-center px-6 py-4 lg:py-5">
      <div class="flex items-center space-x-3">
        <div
          class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"
        >
          <span class="text-white font-bold text-lg">T</span>
        </div>
        <div
          class="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
        >
          TokoVue
        </div>
      </div>
      <nav class="hidden lg:flex space-x-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="group relative px-4 py-2 rounded-lg font-medium transition-all duration-300"
          :class="
            isActive(item.to) ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
          "
        >
          <span class="relative z-10">{{ item.label }}</span>
          <div
            class="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"
            :class="{ 'scale-100': route.path === item.to }"
          ></div>
        </RouterLink>
      </nav>
      <div class="hidden lg:flex items-center space-x-3">
        <!-- Cart Icon -->
        <div class="relative">
          <button 
            @click="toggleCartDropdown"
            class="cart-button p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative"
          >
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
            </svg>
            <!-- Cart Badge -->
            <span v-if="cartStore.totalItems > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {{ cartStore.totalItems }}
            </span>
          </button>
          
          <!-- Cart Dropdown -->
          <div v-if="showCartDropdown" class="cart-dropdown absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div class="px-4 py-2 border-b border-gray-100">
              <h3 class="font-semibold text-gray-900">Keranjang Belanja</h3>
              <p class="text-sm text-gray-500">{{ cartStore.totalItems }} item</p>
            </div>
            
            <div v-if="cartStore.items.length === 0" class="px-4 py-8 text-center text-gray-500">
              <svg class="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
              </svg>
              <p>Keranjang kosong</p>
            </div>
            
            <div v-else class="max-h-64 overflow-y-auto">
              <div v-for="item in cartStore.items" :key="item.id" class="px-4 py-3 border-b border-gray-50 hover:bg-gray-50">
                <div class="flex items-center space-x-3">
                  <img :src="item.image" :alt="item.title" class="w-12 h-12 rounded-lg object-cover">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ item.title }}</p>
                    <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-gray-900">
                      Rp {{ (item.price * item.quantity).toLocaleString('id-ID') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="cartStore.items.length > 0" class="px-4 py-3 border-t border-gray-100">
              <div class="flex justify-between items-center mb-3">
                <span class="font-semibold text-gray-900">Total:</span>
                <span class="font-bold text-lg text-blue-600">
                  Rp {{ cartStore.totalPrice.toLocaleString('id-ID') }}
                </span>
              </div>
              <RouterLink to="/checkout">
                <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  Checkout Sekarang
                </button>
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- User Authentication -->
        <div v-if="authStore.isAuthenticated" class="relative">
          <!-- User Profile Dropdown -->
          <button 
            @click="toggleUserDropdown"
            class="user-button flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <img 
              :src="authStore.user?.avatar || 'https://placehold.co/32x32'" 
              :alt="authStore.user?.name"
              class="w-8 h-8 rounded-full border-2 border-gray-200"
            >
            <span class="text-sm font-medium text-gray-700">{{ authStore.user?.name }}</span>
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <!-- Dropdown Menu -->
          <div v-if="showUserDropdown" class="user-dropdown absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              👤 Profil Saya
            </a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              🛒 Keranjang ({{ cartStore.totalItems }})
            </a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              ❤️ Wishlist
            </a>
            <RouterLink to="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              📦 Pesanan Saya
            </RouterLink>
            <div class="border-t border-gray-100 my-1"></div>
            <button 
              @click="handleLogout"
              class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              🚪 Keluar
            </button>
          </div>
        </div>

        <!-- Login/Register buttons when not authenticated -->
        <div v-else class="flex items-center space-x-3">
          <RouterLink to="/login">
            <Button
              variant="outline"
              class="font-medium border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              Masuk
            </Button>
          </RouterLink>
          <RouterLink to="/register">
            <Button
              class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
            >
              Daftar Gratis
            </Button>
          </RouterLink>
        </div>
      </div>
      <button
        @click="toggleMobileMenu"
        :class="[
          'lg:hidden p-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
          isMobileMenuOpen ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700',
        ]"
      >
        <div class="w-6 h-6 relative">
          <span
            :class="[
              'absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out',
              isMobileMenuOpen ? 'rotate-45 top-2.5' : 'top-1',
            ]"
          ></span>
          <span
            :class="[
              'absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out top-2.5',
              isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100',
            ]"
          ></span>
          <span
            :class="[
              'absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out',
              isMobileMenuOpen ? '-rotate-45 top-2.5' : 'top-4',
            ]"
          ></span>
        </div>
      </button>
    </div>
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-100/50"
      >
        <nav class="container mx-auto px-6 py-6 space-y-1">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            @click="toggleMobileMenu"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300"
            :class="[
              route.path === item.to
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50',
            ]"
          >
            <div
              :class="[
                'w-2 h-2 rounded-full transition-opacity duration-300',
                'bg-' + item.mobileBulletColor,
                route.path === item.to ? 'opacity-100' : 'opacity-0 hover:opacity-100',
              ]"
            ></div>
            <span>{{ item.label }}</span>
          </RouterLink>
          <div class="pt-4 border-t border-gray-100/50 space-y-3">
            <Button
              variant="outline"
              class="w-full font-medium border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
              @click="toggleMobileMenu"
            >
              Masuk
            </Button>
            <Button
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300"
              @click="toggleMobileMenu"
            >
              Daftar Gratis
            </Button>
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<style scoped>
@supports (backdrop-filter: blur(0)) {
  .backdrop-blur-xl {
    backdrop-filter: blur(24px);
  }
  .backdrop-blur-md {
    backdrop-filter: blur(12px);
  }
}

@supports not (backdrop-filter: blur(0)) {
  header {
    background-color: rgba(255, 255, 255, 0.95);
  }
}

.scale-animation {
  transform-origin: center;
}

nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}
</style>
