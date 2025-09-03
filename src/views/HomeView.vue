<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-white font-sans">
    <AppHeader />
    <section class="relative overflow-hidden bg-white">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30"></div>
      <div
        class="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-30"
      ></div>
      <div
        class="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-3xl opacity-20"
      ></div>
      <div class="relative container mx-auto text-center px-6 py-32 md:py-40">
        <div class="max-w-4xl mx-auto">
          <div
            class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-100"
          >
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Solusi UMKM Terdepan
          </div>

          <h1
            class="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight"
          >
            Selamat Datang di
            <span
              class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              TokoVue
            </span>
          </h1>

          <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transformasi digital untuk UMKM Anda. Kelola stok, proses transaksi, dan analisis bisnis
            dengan teknologi modern yang mudah digunakan.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
            >
              Mulai Sekarang →
            </Button>
            <Button
              variant="outline"
              size="lg"
              class="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300"
            >
              Lihat Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
    <section class="py-32 bg-white relative">
      <div class="container mx-auto px-6">
        <div class="text-center mb-20">
          <h2 class="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Fitur yang Mengubah
            <span class="text-blue-600">Bisnis Anda</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Dirancang khusus untuk kebutuhan UMKM Indonesia dengan teknologi terdepan
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Card
            class="group p-8 border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-blue-50/30 hover:scale-105"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3
              class="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors"
            >
              Manajemen Produk
            </h3>
            <p class="text-gray-600 leading-relaxed mb-6">
              Kelola inventori dengan sistem barcode, kategori otomatis, dan alert stok minimum yang
              cerdas.
            </p>
            <div
              class="text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-2"
            >
              Pelajari Lebih →
            </div>
          </Card>
          <Card
            class="group p-8 border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-emerald-50/30 hover:scale-105"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3
              class="text-2xl font-bold mb-4 text-gray-900 group-hover:text-emerald-600 transition-colors"
            >
              Transaksi Cepat
            </h3>
            <p class="text-gray-600 leading-relaxed mb-6">
              POS system terintegrasi dengan pembayaran digital, receipt otomatis, dan sync
              real-time.
            </p>
            <div
              class="text-emerald-600 font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-2"
            >
              Pelajari Lebih →
            </div>
          </Card>
          <Card
            class="group p-8 border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-violet-50/30 hover:scale-105"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3
              class="text-2xl font-bold mb-4 text-gray-900 group-hover:text-violet-600 transition-colors"
            >
              Analytics & Laporan
            </h3>
            <p class="text-gray-600 leading-relaxed mb-6">
              Dashboard analytics dengan insights bisnis, forecasting penjualan, dan laporan pajak
              otomatis.
            </p>
            <div
              class="text-violet-600 font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-2"
            >
              Pelajari Lebih →
            </div>
          </Card>
        </div>
      </div>
    </section>
    <section class="py-32 bg-gradient-to-br from-gray-50 to-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-20">
          <h2 class="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Produk
            <span class="text-blue-600">Unggulan</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan produk berkualitas dengan harga terbaik untuk kebutuhan Anda
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <Card
            v-for="i in 4"
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
        <div class="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            class="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300"
          >
            Lihat Semua Produk →
          </Button>
        </div>
      </div>
    </section>
    <section
      class="py-32 bg-gradient-to-br from-blue-600 to-indigo-700 text-center relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-grid-white/10"></div>
      <div class="absolute top-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>

      <div class="relative container mx-auto px-6">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Siap Mengembangkan
            <span class="text-blue-200">Bisnis Anda?</span>
          </h2>
          <p class="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah dengan ribuan UMKM yang telah merasakan transformasi digital bersama
            TokoVue
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              class="bg-white text-blue-600 hover:bg-blue-50 px-12 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
            >
              Mulai Gratis Sekarang
            </Button>
            <Button
              variant="outline"
              size="lg"
              class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Hubungi Sales
            </Button>
          </div>
          <p class="text-blue-200 mt-8 text-sm">
            ✓ Gratis 14 hari • ✓ Tanpa kartu kredit • ✓ Setup dalam 5 menit
          </p>
        </div>
      </div>
    </section>
    <div class="h-20 bg-white"></div>
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
