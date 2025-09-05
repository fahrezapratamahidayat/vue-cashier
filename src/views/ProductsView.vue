<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Button } from '@/components/ui/button'
import AppHeader from '@/components/AppHeader.vue'
import type { Product } from '@/types'
import ProductCard from '@/components/ProductCard.vue'

const products = ref<Product[]>([])
const isLoading = ref<boolean>(true)
const error = ref<string>('')
const selectedCategory = ref<string>('All')
const currentPage = ref<number>(1)
const itemsPerPage = 10

const fetchProducts = async () => {
  try {
    isLoading.value = true
    const response = await fetch('https://api.escuelajs.co/api/v1/products')
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const data = await response.json()
    products.value = data
  } catch (err) {
    error.value = 'Gagal memuat produk. Silakan coba lagi nanti.'
  } finally {
    isLoading.value = false
  }
}

const categories = computed(() => {
  const cats = new Set(products.value.map((product) => product.category.name))
  return ['All', ...Array.from(cats).sort()]
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'All') {
    return products.value
  }
  return products.value.filter((product) => product.category.name === selectedCategory.value)
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-white font-sans">
    <AppHeader />
    <section class="relative overflow-hidden bg-white py-24">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30"></div>
      <div
        class="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-30"
      ></div>
      <div
        class="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-3xl opacity-20"
      ></div>
      <div class="relative container mx-auto px-6">
        <div class="text-center mb-16">
          <div
            class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-100"
          >
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Produk UMKM Terbaik
          </div>
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Jelajahi <span class="text-blue-600">Produk Kami</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Temukan berbagai produk berkualitas tinggi dari UMKM Indonesia, dirancang untuk
            mendukung kebutuhan bisnis dan gaya hidup Anda.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <div class="flex gap-4 flex-wrap">
            <Button
              v-for="category in categories"
              :key="category"
              variant="outline"
              class="border-2 font-semibold flex items-center"
              :class="[
                selectedCategory === category
                  ? 'bg-blue-50 text-blue-600 border-blue-300'
                  : 'border-gray-200 text-gray-900 hover:bg-gray-50',
              ]"
              @click="((selectedCategory = category), (currentPage = 1))"
            >
              {{ category }}
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
          </div>
          <p class="text-gray-600 text-sm">
            Menampilkan <span class="font-semibold">{{ filteredProducts.length }}</span> produk
          </p>
        </div>
        <div v-if="isLoading" class="text-center py-12">
          <div class="inline-flex items-center gap-2 text-gray-600">
            <div
              class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
            ></div>
            <span class="text-lg">Memuat produk...</span>
          </div>
        </div>
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-600 text-lg font-medium">{{ error }}</p>
          <Button
            variant="outline"
            class="mt-4 border-2 border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold"
            @click="fetchProducts"
          >
            Coba Lagi
          </Button>
        </div>
        <div v-else-if="filteredProducts.length === 0" class="text-center py-12">
          <p class="text-gray-600 text-lg font-medium">
            Tidak ada produk ditemukan untuk kategori ini.
          </p>
          <Button
            variant="outline"
            class="mt-4 border-2 border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold"
            @click="selectedCategory = 'All'"
          >
            Lihat Semua Produk
          </Button>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
          <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product" />
        </div>
        <div v-if="filteredProducts.length > 0" class="flex justify-center mt-12">
          <div class="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              class="border-2 border-gray-200 hover:bg-gray-50 text-gray-900"
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
            >
              Sebelumnya
            </Button>
            <Button
              v-for="n in totalPages"
              :key="n"
              variant="outline"
              size="sm"
              class="border-2 border-gray-200 hover:bg-gray-50 text-gray-900"
              :class="{ 'bg-blue-50 text-blue-600': n === currentPage }"
              @click="changePage(n)"
            >
              {{ n }}
            </Button>
            <Button
              variant="outline"
              size="sm"
              class="border-2 border-gray-200 hover:bg-gray-50 text-gray-900"
              :disabled="currentPage === totalPages"
              @click="changePage(currentPage + 1)"
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      </div>
    </section>
    <section
      class="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-center relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-grid-white/10"></div>
      <div class="absolute top-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>

      <div class="relative container mx-auto px-6">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
          Temukan Produk <span class="text-blue-200">Impian Anda</span>
        </h2>
        <p class="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
          Dukung UMKM Indonesia dengan memilih produk berkualitas dari TokoVue
        </p>
        <Button
          size="lg"
          class="bg-white text-blue-600 hover:bg-blue-50 px-12 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
        >
          Belanja Sekarang
        </Button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-grid-white\/10 {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
