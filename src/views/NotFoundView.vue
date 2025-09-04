<script setup lang="ts">
import { Button } from '@/components/ui/button'
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
      <div class="relative container mx-auto px-6 text-center">
        <div class="max-w-3xl mx-auto">
          <div
            class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-100"
          >
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Halaman Tidak Ditemukan
          </div>
          <h1
            class="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight"
          >
            404 -
            <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              >Oops!</span
            >
          </h1>
          <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Maaf, sepertinya halaman yang Anda cari tidak ada atau telah dipindahkan. Mari kembali
            ke jalur yang benar!
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
            >
              Kembali ke Beranda
            </Button>
            <Button
              variant="outline"
              size="lg"
              class="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300"
            >
              Jelajahi Produk
            </Button>
          </div>
        </div>
        <div class="mt-16">
          <div class="text-9xl text-gray-200">😕</div>
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
          Temukan <span class="text-blue-200">Produk Impian Anda</span>
        </h2>
        <p class="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
          Jelajahi koleksi produk berkualitas dari UMKM Indonesia di TokoVue
        </p>
        <Button
          size="lg"
          class="bg-white text-blue-600 hover:bg-blue-50 px-12 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
        >
          Lihat Produk Sekarang
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
