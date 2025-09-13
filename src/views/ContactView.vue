<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppHeader from '@/components/AppHeader.vue'
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
  inquiryType: 'general'
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const contactMethods = [
  {
    icon: '📞',
    title: 'Telepon',
    description: 'Hubungi tim support kami',
    value: '+62 21 1234 5678',
    action: 'tel:+622112345678',
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-white to-blue-50/30'
  },
  {
    icon: '✉️',
    title: 'Email',
    description: 'Kirim email ke tim kami',
    value: 'support@tokovue.com',
    action: 'mailto:support@tokovue.com',
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-white to-emerald-50/30'
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    description: 'Chat langsung via WhatsApp',
    value: '+62 812 3456 7890',
    action: 'https://wa.me/6281234567890',
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-white to-green-50/30'
  },
  {
    icon: '📍',
    title: 'Alamat Kantor',
    description: 'Kunjungi kantor kami',
    value: 'Jl. Sudirman No. 123, Jakarta',
    action: 'https://maps.google.com',
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-white to-violet-50/30'
  }
]

const faqItems = [
  {
    question: 'Bagaimana cara memulai menggunakan TokoVue?',
    answer: 'Anda dapat memulai dengan mendaftar trial gratis 14 hari. Setelah registrasi, tim kami akan membantu setup awal dan training penggunaan sistem.'
  },
  {
    question: 'Apakah data saya aman di TokoVue?',
    answer: 'Ya, kami menggunakan enkripsi tingkat enterprise dan backup otomatis. Data Anda disimpan di server cloud yang aman dengan sertifikasi internasional.'
  },
  {
    question: 'Bisakah TokoVue terintegrasi dengan sistem yang sudah ada?',
    answer: 'TokoVue menyediakan API dan berbagai integrasi dengan marketplace, payment gateway, dan sistem akuntansi populer di Indonesia.'
  },
  {
    question: 'Berapa biaya berlangganan TokoVue?',
    answer: 'Kami menawarkan paket mulai dari Rp 99.000/bulan dengan berbagai fitur. Hubungi tim sales untuk konsultasi paket yang sesuai kebutuhan bisnis Anda.'
  }
]

const openLink = (url: string) => {
  window.open(url, '_blank')
}

const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  isSubmitting.value = false
  isSubmitted.value = true
  
  // Reset form after 3 seconds
  setTimeout(() => {
    isSubmitted.value = false
    form.value = {
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    }
  }, 3000)
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
            Hubungi Tim Kami
          </div>

          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Mari Bicara Tentang
            <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Bisnis Anda
            </span>
          </h1>

          <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Tim ahli kami siap membantu Anda memilih solusi terbaik untuk mengembangkan bisnis. 
            Konsultasi gratis dan tanpa komitmen.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
            >
              Konsultasi Gratis →
            </Button>
            <Button
              variant="outline"
              size="lg"
              class="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300"
            >
              Jadwalkan Demo
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Methods -->
    <section class="py-20 bg-white relative">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Cara Menghubungi
            <span class="text-blue-600">Kami</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih cara yang paling nyaman untuk Anda
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <Card
            v-for="method in contactMethods"
            :key="method.title"
            :class="[
              'group p-6 border-0 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105 text-center',
              `bg-gradient-to-br ${method.bgGradient}`
            ]"
            @click="() => openLink(method.action)"
          >
            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {{ method.icon }}
            </div>
            
            <h3 class="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
              {{ method.title }}
            </h3>
            
            <p class="text-gray-600 text-sm mb-3">
              {{ method.description }}
            </p>

            <p class="text-blue-600 font-semibold text-sm">
              {{ method.value }}
            </p>

            <div :class="[
              'w-12 h-1 mx-auto mt-4 rounded-full transition-all duration-300',
              `bg-gradient-to-r ${method.gradient}`,
              'group-hover:w-16'
            ]"></div>
          </Card>
        </div>
      </div>
    </section>

    <!-- Contact Form & Info -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          <!-- Contact Form -->
          <div>
            <div class="mb-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">
                Kirim Pesan
              </h2>
              <p class="text-gray-600">
                Isi form di bawah ini dan tim kami akan merespons dalam 24 jam
              </p>
            </div>

            <Card class="p-8 shadow-xl border-0">
              <form @submit.prevent="submitForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label for="name" class="text-sm font-semibold text-gray-700">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      v-model="form.name"
                      type="text"
                      required
                      class="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <Label for="email" class="text-sm font-semibold text-gray-700">Email *</Label>
                    <Input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      class="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label for="phone" class="text-sm font-semibold text-gray-700">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      class="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                  <div>
                    <Label for="company" class="text-sm font-semibold text-gray-700">Nama Perusahaan</Label>
                    <Input
                      id="company"
                      v-model="form.company"
                      type="text"
                      class="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="PT. Contoh Perusahaan"
                    />
                  </div>
                </div>

                <div>
                  <Label for="inquiryType" class="text-sm font-semibold text-gray-700">Jenis Pertanyaan</Label>
                  <select
                    id="inquiryType"
                    v-model="form.inquiryType"
                    class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 bg-white"
                  >
                    <option value="general">Pertanyaan Umum</option>
                    <option value="demo">Request Demo</option>
                    <option value="pricing">Informasi Harga</option>
                    <option value="technical">Support Teknis</option>
                    <option value="partnership">Kemitraan</option>
                  </select>
                </div>

                <div>
                  <Label for="subject" class="text-sm font-semibold text-gray-700">Subjek *</Label>
                  <Input
                    id="subject"
                    v-model="form.subject"
                    type="text"
                    required
                    class="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Subjek pesan Anda"
                  />
                </div>

                <div>
                  <Label for="message" class="text-sm font-semibold text-gray-700">Pesan *</Label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    required
                    rows="5"
                    class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  :disabled="isSubmitting || isSubmitted"
                  class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold py-3 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50"
                >
                  <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Mengirim...
                  </span>
                  <span v-else-if="isSubmitted" class="flex items-center justify-center gap-2">
                    ✓ Pesan Terkirim!
                  </span>
                  <span v-else>
                    Kirim Pesan
                  </span>
                </Button>
              </form>
            </Card>
          </div>

          <!-- Company Info & FAQ -->
          <div class="space-y-8">
            <!-- Company Info -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-6">
                Informasi Perusahaan
              </h3>
              
              <Card class="p-6 shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
                <div class="space-y-4">
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-blue-600">🏢</span>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">PT. TokoVue Indonesia</h4>
                      <p class="text-gray-600 text-sm">Jl. Sudirman No. 123, Jakarta Pusat 10110</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-emerald-600">⏰</span>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">Jam Operasional</h4>
                      <p class="text-gray-600 text-sm">Senin - Jumat: 09:00 - 18:00 WIB</p>
                      <p class="text-gray-600 text-sm">Sabtu: 09:00 - 15:00 WIB</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span class="text-violet-600">🎯</span>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">Response Time</h4>
                      <p class="text-gray-600 text-sm">Email: &lt; 24 jam</p>
                      <p class="text-gray-600 text-sm">WhatsApp: &lt; 2 jam</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <!-- FAQ -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-6">
                Pertanyaan Umum
              </h3>
              
              <div class="space-y-4">
                <Card
                  v-for="faq in faqItems"
                  :key="faq.question"
                  class="p-6 shadow-sm border-0 hover:shadow-lg transition-all duration-300"
                >
                  <h4 class="font-semibold text-gray-900 mb-2">
                    {{ faq.question }}
                  </h4>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    {{ faq.answer }}
                  </p>
                </Card>
              </div>
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
            Siap Memulai
            <span class="text-blue-200">Transformasi Digital?</span>
          </h2>
          <p class="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Jangan tunggu lagi! Mulai trial gratis hari ini dan rasakan perbedaannya
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
              Hubungi Sales
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