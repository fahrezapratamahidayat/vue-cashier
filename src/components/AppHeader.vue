<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Button } from '@/components/ui/button'

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
        <a
          href="#hero"
          class="group relative px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 transition-all duration-300"
        >
          <span class="relative z-10">Home</span>
          <div
            class="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"
          ></div>
        </a>
        <a
          href="#features"
          class="group relative px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 transition-all duration-300"
        >
          <span class="relative z-10">Fitur</span>
          <div
            class="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"
          ></div>
        </a>
        <a
          href="#products"
          class="group relative px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 transition-all duration-300"
        >
          <span class="relative z-10">Produk</span>
          <div
            class="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"
          ></div>
        </a>
        <a
          href="#contact"
          class="group relative px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 transition-all duration-300"
        >
          <span class="relative z-10">Kontak</span>
          <div
            class="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"
          ></div>
        </a>
      </nav>
      <div class="hidden lg:flex items-center space-x-3">
        <Button
          variant="outline"
          class="font-medium border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
        >
          Masuk
        </Button>
        <Button
          class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
        >
          Daftar Gratis
        </Button>
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
          <a
            href="#hero"
            @click="toggleMobileMenu"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
          >
            <div
              class="w-2 h-2 bg-blue-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
            ></div>
            <span>Home</span>
          </a>
          <a
            href="#features"
            @click="toggleMobileMenu"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
          >
            <div
              class="w-2 h-2 bg-emerald-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
            ></div>
            <span>Fitur</span>
          </a>
          <a
            href="#products"
            @click="toggleMobileMenu"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
          >
            <div
              class="w-2 h-2 bg-violet-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
            ></div>
            <span>Produk</span>
          </a>
          <a
            href="#contact"
            @click="toggleMobileMenu"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
          >
            <div
              class="w-2 h-2 bg-orange-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
            ></div>
            <span>Kontak</span>
          </a>
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
