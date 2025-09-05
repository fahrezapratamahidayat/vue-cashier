<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import AppHeader from '@/components/AppHeader.vue'
import { RouterLink } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'

interface Category {
  id: number
  name: string
  slug: string
  image: string
}

interface Product {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: Category
  images: string[]
}

const route = useRoute()
const product = ref<Product | null>(null)
const relatedProducts = ref<Product[]>([])
const isLoading = ref<boolean>(true)
const error = ref<string>('')
const currentImageIndex = ref<number>(0)

// Fetch product by slug
const fetchProduct = async () => {
  try {
    isLoading.value = true
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/slug/${route.params.slug}`,
    )
    if (!response.ok) {
      throw new Error('Failed to fetch product')
    }
    const data = await response.json()
    if (!data || !data.id) {
      throw new Error('Product not found')
    }
    product.value = data
  } catch (err) {
    error.value = 'Gagal memuat produk. Silakan coba lagi nanti.'
  } finally {
    isLoading.value = false
  }
}

// Fetch related products
const fetchRelatedProducts = async () => {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/slug/${route.params.slug}/related`,
    )
    if (!response.ok) {
      throw new Error('Failed to fetch related products')
    }
    const data = await response.json()
    relatedProducts.value = data.slice(0, 4) // Limit to 4 related products
  } catch (err) {
    console.warn('Failed to load related products:', err)
    relatedProducts.value = [] // Fallback to empty array
  }
}

// Image carousel controls
const nextImage = () => {
  if (product.value && currentImageIndex.value < product.value.images.length - 1) {
    currentImageIndex.value++
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

onMounted(() => {
  Promise.all([fetchProduct(), fetchRelatedProducts()])
})

watchEffect(() => {
  if (route.params.slug) {
    fetchProduct()
    fetchRelatedProducts()
    currentImageIndex.value = 0
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-white font-sans">
    <AppHeader />
    <section class="relative overflow-hidden bg-white py-24">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30"></div>
      <div
        class="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-30"
      ></div>
      <div
        class="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-3xl opacity-20"
      ></div>

      <div class="relative container mx-auto px-6">
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-12">
          <div class="inline-flex items-center gap-2 text-gray-600">
            <div
              class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
            ></div>
            <span class="text-lg">Memuat produk...</span>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-600 text-lg font-medium">{{ error }}</p>
          <RouterLink to="/products">
            <Button
              variant="outline"
              class="mt-4 border-2 border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold"
            >
              Kembali ke Produk
            </Button>
          </RouterLink>
        </div>

        <!-- Product Details -->
        <div v-else-if="product" class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="relative">
            <Card
              class="border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white p-0"
            >
              <div class="relative overflow-hidden rounded-2xl">
                <div class="w-full h-[500px] relative overflow-hidden">
                  <img
                    :src="product.images[currentImageIndex]"
                    :alt="product.title"
                    class="w-full h-full object-cover"
                    @error="
                      ($event.target as HTMLImageElement).src = 'https://placehold.co/600x400'
                    "
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"
                  ></div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300"
                >
                  🔍 Zoom
                </Button>
                <!-- Image Carousel Controls -->
                <div
                  v-if="product.images.length > 1"
                  class="absolute bottom-4 left-4 right-4 flex justify-between"
                >
                  <Button
                    size="sm"
                    variant="outline"
                    class="bg-white/90 backdrop-blur-sm hover:bg-white"
                    :disabled="currentImageIndex === 0"
                    @click="prevImage"
                  >
                    ←
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    class="bg-white/90 backdrop-blur-sm hover:bg-white"
                    :disabled="currentImageIndex === product.images.length - 1"
                    @click="nextImage"
                  >
                    →
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div class="flex flex-col justify-center">
            <div
              class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-100"
            >
              <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              {{ product.category.name }}
            </div>
            <h1
              class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight"
            >
              {{ product.title }}
            </h1>
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400 mr-4">⭐⭐⭐⭐⭐</div>
              <span class="text-gray-600 text-sm">(128 Ulasan)</span>
            </div>
            <div class="flex items-center mb-6">
              <span class="text-3xl font-bold text-gray-900"
                >Rp {{ product.price.toLocaleString('id-ID') }}</span
              >
            </div>
            <p class="text-gray-600 mb-8 leading-relaxed text-lg">
              {{ product.description }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
              >
                Tambah ke Keranjang
              </Button>
              <Button
                variant="outline"
                size="lg"
                class="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300"
              >
                Tambah ke Wishlist
              </Button>
            </div>
            <div class="text-gray-600 text-sm">
              <p>✓ Tersedia: <span class="font-semibold">50 stok</span></p>
              <p>✓ Pengiriman: 1-2 hari kerja</p>
              <p>✓ Garansi: 30 hari uang kembali</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section v-if="product" class="py-24 bg-white">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-gray-900 mb-12 text-center tracking-tight">
          Fitur <span class="text-blue-600">Produk</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card
            class="group p-6 border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-blue-50/30 hover:scale-105"
          >
            <div
              class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3
              class="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors"
            >
              Kualitas Terjamin
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Dibuat dengan bahan premium untuk ketahanan dan performa maksimal.
            </p>
          </Card>
          <Card
            class="group p-6 border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-emerald-50/30 hover:scale-105"
          >
            <div
              class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3
              class="text-xl font-bold mb-2 text-gray-900 group-hover:text-emerald-600 transition-colors"
            >
              Penggunaan Mudah
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Desain intuitif yang memudahkan pengguna dari semua level.
            </p>
          </Card>
          <Card
            class="group p-6 border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-violet-50/30 hover:scale-105"
          >
            <div
              class="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                />
              </svg>
            </div>
            <h3
              class="text-xl font-bold mb-2 text-gray-900 group-hover:text-violet-600 transition-colors"
            >
              Dukungan Purna Jual
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Layanan pelanggan 24/7 dan garansi penggantian produk.
            </p>
          </Card>
        </div>
      </div>
    </section>

    <section
      v-if="relatedProducts.length > 0"
      class="py-24 bg-gradient-to-br from-gray-50 to-white"
    >
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-gray-900 mb-12 text-center tracking-tight">
          Produk <span class="text-blue-600">Terkait</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <ProductCard v-for="related in relatedProducts" :key="related.id" :product="related" />
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
          Dapatkan Produk Ini <span class="text-blue-200">Sekarang</span>
        </h2>
        <p class="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
          Tingkatkan bisnis Anda dengan produk berkualitas dari TokoVue
        </p>
        <Button
          size="lg"
          class="bg-white text-blue-600 hover:bg-blue-50 px-12 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
        >
          Beli Sekarang
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
