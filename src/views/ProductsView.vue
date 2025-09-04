<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import AppHeader from '@/components/AppHeader.vue'
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
          <div class="flex gap-4">
            <Button
              variant="outline"
              class="border-2 border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold"
            >
              Kategori
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
            <Button
              variant="outline"
              class="border-2 border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold"
            >
              Urutkan
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
            Menampilkan <span class="font-semibold">1-12</span> dari
            <span class="font-semibold">50 produk</span>
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <Card
            v-for="i in 12"
            :key="i"
            class="group overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white"
          >
            <div class="relative overflow-hidden">
              <div
                class="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"
                ></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-6xl text-gray-300">📦</div>
                </div>
                <div
                  class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"
                ></div>
                <div
                  class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Button
                    size="sm"
                    variant="outline"
                    class="bg-white/90 backdrop-blur-sm hover:bg-white"
                  >
                    👁️
                  </Button>
                </div>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-start justify-between mb-3">
                <h3
                  class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors"
                >
                  Produk Premium {{ i }}
                </h3>
                <div class="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p class="text-gray-600 mb-4 text-sm leading-relaxed">
                Deskripsi produk berkualitas tinggi dengan fitur unggulan
              </p>
              <div class="flex items-center justify-between mb-4">
                <div>
                  <span class="text-2xl font-bold text-gray-900">Rp 150.000</span>
                  <span class="text-sm text-gray-500 line-through ml-2">Rp 200.000</span>
                </div>
                <div class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                  -25%
                </div>
              </div>
              <Button
                size="sm"
                class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Tambah ke Keranjang
              </Button>
            </div>
          </Card>
        </div>
        <div class="flex justify-center mt-12">
          <div class="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              class="border-2 border-gray-200 hover:bg-gray-50 text-gray-900"
            >
              Sebelumnya
            </Button>
            <Button
              v-for="n in 3"
              :key="n"
              variant="outline"
              size="sm"
              class="border-2 border-gray-200 hover:bg-gray-50 text-gray-900"
              :class="{ 'bg-blue-50 text-blue-600': n === 1 }"
            >
              {{ n }}
            </Button>
            <Button
              variant="outline"
              size="sm"
              class="border-2 border-gray-200 hover:bg-gray-50 text-gray-900"
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
