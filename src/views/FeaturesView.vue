<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import AppHeader from '@/components/AppHeader.vue'
import { ref } from 'vue'

const features = [
  {
    id: 1,
    title: 'Manajemen Produk Cerdas',
    description: 'Kelola inventori dengan sistem barcode, kategori otomatis, tracking stok real-time, dan alert minimum stok yang cerdas.',
    icon: '📦',
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-white to-blue-50/30',
    hoverColor: 'hover:text-blue-600',
    textColor: 'text-blue-600',
    details: [
      'Sistem barcode terintegrasi',
      'Kategorisasi produk otomatis',
      'Alert stok minimum',
      'Tracking pergerakan stok',
      'Import/export data produk'
    ]
  },
  {
    id: 2,
    title: 'POS System Terintegrasi',
    description: 'Point of Sale modern dengan pembayaran digital, receipt otomatis, dan sinkronisasi real-time ke semua device.',
    icon: '💳',
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-white to-emerald-50/30',
    hoverColor: 'hover:text-emerald-600',
    textColor: 'text-emerald-600',
    details: [
      'Pembayaran digital (QRIS, E-wallet)',
      'Receipt digital & cetak',
      'Multi-device sync',
      'Cashier multi-user',
      'Diskon & promo otomatis'
    ]
  },
  {
    id: 3,
    title: 'Analytics & Reporting',
    description: 'Dashboard analytics dengan insights bisnis mendalam, forecasting penjualan, dan laporan pajak otomatis.',
    icon: '📊',
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-white to-violet-50/30',
    hoverColor: 'hover:text-violet-600',
    textColor: 'text-violet-600',
    details: [
      'Dashboard real-time',
      'Laporan penjualan harian/bulanan',
      'Analisis trend produk',
      'Forecasting penjualan',
      'Export laporan pajak'
    ]
  },
  {
    id: 4,
    title: 'Customer Management',
    description: 'Kelola database pelanggan, program loyalitas, dan komunikasi terintegrasi untuk meningkatkan retention.',
    icon: '👥',
    gradient: 'from-orange-500 to-red-600',
    bgGradient: 'from-white to-orange-50/30',
    hoverColor: 'hover:text-orange-600',
    textColor: 'text-orange-600',
    details: [
      'Database pelanggan lengkap',
      'Program loyalitas & poin',
      'Segmentasi pelanggan',
      'Email & SMS marketing',
      'Riwayat pembelian'
    ]
  },
  {
    id: 5,
    title: 'Multi-Channel Integration',
    description: 'Sinkronisasi dengan marketplace, e-commerce, dan media sosial untuk mengelola semua channel dalam satu platform.',
    icon: '🌐',
    gradient: 'from-pink-500 to-rose-600',
    bgGradient: 'from-white to-pink-50/30',
    hoverColor: 'hover:text-pink-600',
    textColor: 'text-pink-600',
    details: [
      'Integrasi marketplace (Tokopedia, Shopee)',
      'Sinkronisasi stok otomatis',
      'Manajemen pesanan terpusat',
      'Social commerce integration',
      'API untuk custom integration'
    ]
  },
  {
    id: 6,
    title: 'Cloud Storage & Security',
    description: 'Data aman di cloud dengan backup otomatis, enkripsi tingkat enterprise, dan akses multi-device.',
    icon: '☁️',
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-white to-cyan-50/30',
    hoverColor: 'hover:text-cyan-600',
    textColor: 'text-cyan-600',
    details: [
      'Cloud backup otomatis',
      'Enkripsi data end-to-end',
      'Multi-device access',
      'Role-based permissions',
      '99.9% uptime guarantee'
    ]
  }
]

const selectedFeature = ref<number | null>(null)

const selectFeature = (id: number) => {
  selectedFeature.value = selectedFeature.value === id ? null : id
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-white font-sans">
    <AppHeader />
    
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-white pt-24">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30"></div>
      <div class="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-30"></div>
      <div class="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-3xl opacity-20"></div>
      
      <div class="relative container mx-auto text-center px-6 py-20 md:py-32">
        <div class="max-w-4xl mx-auto">
          <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-100">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Fitur Lengkap untuk UMKM
          </div>

          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Fitur yang Mengubah
            <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Cara Berbisnis
            </span>
          </h1>

          <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Dilengkapi dengan teknologi terdepan dan dirancang khusus untuk kebutuhan UMKM Indonesia. 
            Semua yang Anda butuhkan untuk mengembangkan bisnis dalam satu platform.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
            >
              Coba Gratis Sekarang →
            </Button>
            <Button
              variant="outline"
              size="lg"
              class="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300"
            >
              Lihat Demo Live
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="py-20 bg-white relative">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Fitur Unggulan
            <span class="text-blue-600">TokoVue</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Setiap fitur dirancang untuk memudahkan operasional bisnis Anda
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Card
            v-for="feature in features"
            :key="feature.id"
            :class="[
              'group p-8 border-0 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105',
              `bg-gradient-to-br ${feature.bgGradient}`,
              selectedFeature === feature.id ? 'ring-2 ring-blue-500 shadow-2xl scale-105' : ''
            ]"
            @click="selectFeature(feature.id)"
          >
            <div class="text-center mb-6">
              <div class="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {{ feature.icon }}
              </div>
              <div :class="[
                'w-16 h-1 mx-auto rounded-full transition-all duration-300',
                `bg-gradient-to-r ${feature.gradient}`,
                selectedFeature === feature.id ? 'w-24' : 'group-hover:w-20'
              ]"></div>
            </div>
            
            <h3 :class="[
              'text-xl font-bold mb-4 text-gray-900 transition-colors text-center',
              feature.hoverColor
            ]">
              {{ feature.title }}
            </h3>
            
            <p class="text-gray-600 leading-relaxed mb-6 text-center">
              {{ feature.description }}
            </p>

            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-96"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 max-h-96"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="selectedFeature === feature.id" class="overflow-hidden">
                <div class="border-t border-gray-200 pt-4 mt-4">
                  <h4 class="font-semibold text-gray-900 mb-3">Detail Fitur:</h4>
                  <ul class="space-y-2">
                    <li 
                      v-for="detail in feature.details" 
                      :key="detail"
                      class="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div :class="['w-1.5 h-1.5 rounded-full', `bg-gradient-to-r ${feature.gradient}`]"></div>
                      {{ detail }}
                    </li>
                  </ul>
                </div>
              </div>
            </transition>

            <div :class="[
              'font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-2 justify-center w-full mt-4',
              feature.textColor
            ]">
              {{ selectedFeature === feature.id ? 'Tutup Detail' : 'Lihat Detail' }} →
            </div>
          </Card>
        </div>
      </div>
    </section>

    <!-- Comparison Section -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Mengapa Memilih
            <span class="text-blue-600">TokoVue?</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Bandingkan dengan solusi lain dan lihat keunggulan kami
          </p>
        </div>

        <div class="max-w-5xl mx-auto">
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th class="px-6 py-4 text-left font-semibold">Fitur</th>
                    <th class="px-6 py-4 text-center font-semibold">TokoVue</th>
                    <th class="px-6 py-4 text-center font-semibold">Kompetitor A</th>
                    <th class="px-6 py-4 text-center font-semibold">Kompetitor B</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 font-medium text-gray-900">Cloud Storage</td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-green-600 text-xl">✓</div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-green-600 text-xl">✓</div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-red-500 text-xl">✗</div>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 font-medium text-gray-900">Multi-Channel Integration</td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-green-600 text-xl">✓</div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-yellow-500 text-xl">~</div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-red-500 text-xl">✗</div>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 font-medium text-gray-900">Advanced Analytics</td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-green-600 text-xl">✓</div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-yellow-500 text-xl">~</div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-yellow-500 text-xl">~</div>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 font-medium text-gray-900">24/7 Support</td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-green-600 text-xl">✓</div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-yellow-500 text-xl">~</div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-red-500 text-xl">✗</div>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 font-medium text-gray-900">Harga per Bulan</td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-blue-600 font-bold">Rp 99k</div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-gray-600 font-bold">Rp 150k</div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-gray-600 font-bold">Rp 200k</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-center relative overflow-hidden">
      <div class="absolute inset-0 bg-grid-white/10"></div>
      <div class="absolute top-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>

      <div class="relative container mx-auto px-6">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Siap Merasakan
            <span class="text-blue-200">Semua Fitur Ini?</span>
          </h2>
          <p class="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Mulai transformasi digital bisnis Anda hari ini dengan trial gratis 14 hari
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              class="bg-white text-blue-600 hover:bg-blue-50 px-12 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
            >
              Mulai Trial Gratis
            </Button>
            <Button
              variant="outline"
              size="lg"
              class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Konsultasi Gratis
            </Button>
          </div>
          <p class="text-blue-200 mt-8 text-sm">
            ✓ Gratis 14 hari • ✓ Tanpa kartu kredit • ✓ Setup dalam 5 menit • ✓ Support 24/7
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