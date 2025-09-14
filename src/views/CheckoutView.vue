<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppHeader from '@/components/AppHeader.vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useOrdersStore } from '@/stores/orders'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()
const ordersStore = useOrdersStore()

if (!authStore.isAuthenticated) {
  router.push('/login')
}

if (cartStore.items.length === 0) {
  router.push('/products')
}
const shippingForm = ref({
  fullName: authStore.user?.name || '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  notes: '',
})

const selectedShipping = ref('regular')
const selectedPayment = ref('cod')
const isProcessing = ref(false)

const shippingOptions = [
  {
    id: 'regular',
    name: 'Reguler (2-3 hari)',
    price: 15000,
    description: 'Pengiriman standar dengan estimasi 2-3 hari kerja',
  },
  {
    id: 'express',
    name: 'Express (1 hari)',
    price: 25000,
    description: 'Pengiriman cepat dengan estimasi 1 hari kerja',
  },
  {
    id: 'same-day',
    name: 'Same Day',
    price: 35000,
    description: 'Pengiriman di hari yang sama (area tertentu)',
  },
]

const paymentOptions = [
  {
    id: 'cod',
    name: 'Bayar di Tempat (COD)',
    description: 'Bayar saat barang diterima',
    icon: '💵',
  },
  {
    id: 'bank-transfer',
    name: 'Transfer Bank',
    description: 'BCA, Mandiri, BNI, BRI',
    icon: '🏦',
  },
  {
    id: 'e-wallet',
    name: 'E-Wallet',
    description: 'GoPay, OVO, DANA, ShopeePay',
    icon: '📱',
  },
  {
    id: 'credit-card',
    name: 'Kartu Kredit',
    description: 'Visa, Mastercard, JCB',
    icon: '💳',
  },
]

const isLoading = ref(false)

const subtotal = computed(() => cartStore.totalPrice)
const shippingCost = computed(() => {
  const option = shippingOptions.find((opt) => opt.id === selectedShipping.value)
  return option ? option.price : 0
})
const totalPrice = computed(() => subtotal.value + shippingCost.value)

const updateQuantity = (productId: number, quantity: number) => {
  cartStore.updateQuantity(productId, quantity)
}

const removeItem = (productId: number) => {
  cartStore.removeFromCart(productId)
}

const validateForm = () => {
  if (!shippingForm.value.fullName || !shippingForm.value.phone || !shippingForm.value.address) {
    alert('Silakan lengkapi informasi pengiriman')
    return false
  }
  return true
}

const processCheckout = async () => {
  if (!validateForm()) return

  isLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderData = {
      status: 'pending' as const,
      items: cartStore.items.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        slug: item.slug,
      })),
      subtotal: cartStore.totalPrice,
      shippingCost: shippingOptions.find((opt) => opt.id === selectedShipping.value)?.price || 0,
      total: totalPrice.value,
      shippingAddress: {
        fullName: shippingForm.value.fullName,
        phone: shippingForm.value.phone,
        address: shippingForm.value.address,
        city: shippingForm.value.city,
        postalCode: shippingForm.value.postalCode,
        notes: shippingForm.value.notes,
      },
      shippingMethod: shippingOptions.find((opt) => opt.id === selectedShipping.value)?.name || '',
      paymentMethod:
        paymentOptions.find((method) => method.id === selectedPayment.value)?.name || '',
    }

    const newOrder = ordersStore.createOrder(orderData)

    cartStore.clearCart()

    alert(`Pesanan berhasil dibuat! Nomor pesanan: ${newOrder.orderNumber}`)

    router.push('/orders')
  } catch {
    alert('Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <div class="pt-24 pb-12">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p class="text-gray-600">Lengkapi informasi pengiriman dan pembayaran</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  Alamat Pengiriman
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label for="fullName">Nama Lengkap</Label>
                    <Input
                      id="fullName"
                      v-model="shippingForm.fullName"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <Label for="phone">Nomor Telepon</Label>
                    <Input id="phone" v-model="shippingForm.phone" placeholder="08xxxxxxxxxx" />
                  </div>
                </div>
                <div>
                  <Label for="address">Alamat Lengkap</Label>
                  <textarea
                    id="address"
                    v-model="shippingForm.address"
                    placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
                    rows="3"
                    class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label for="city">Kota</Label>
                    <Input id="city" v-model="shippingForm.city" placeholder="Nama kota" />
                  </div>
                  <div>
                    <Label for="postalCode">Kode Pos</Label>
                    <Input id="postalCode" v-model="shippingForm.postalCode" placeholder="12345" />
                  </div>
                </div>
                <div>
                  <Label for="notes">Catatan (Opsional)</Label>
                  <textarea
                    id="notes"
                    v-model="shippingForm.notes"
                    placeholder="Catatan untuk kurir atau penjual"
                    rows="2"
                    class="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    ></path>
                  </svg>
                  Pilih Pengiriman
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <div
                  v-for="option in shippingOptions"
                  :key="option.id"
                  class="border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-300"
                  :class="
                    selectedShipping === option.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  "
                  @click="selectedShipping = option.id"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <input
                        type="radio"
                        :value="option.id"
                        v-model="selectedShipping"
                        class="text-blue-600"
                      />
                      <div>
                        <h3 class="font-medium text-gray-900">{{ option.name }}</h3>
                        <p class="text-sm text-gray-600">{{ option.description }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <span class="font-semibold text-gray-900"
                        >Rp {{ option.price.toLocaleString('id-ID') }}</span
                      >
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    ></path>
                  </svg>
                  Metode Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <div
                  v-for="option in paymentOptions"
                  :key="option.id"
                  class="border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-300"
                  :class="
                    selectedPayment === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  "
                  @click="selectedPayment = option.id"
                >
                  <div class="flex items-center gap-3">
                    <input
                      type="radio"
                      :value="option.id"
                      v-model="selectedPayment"
                      class="text-blue-600"
                    />
                    <span class="text-2xl">{{ option.icon }}</span>
                    <div>
                      <h3 class="font-medium text-gray-900">{{ option.name }}</h3>
                      <p class="text-sm text-gray-600">{{ option.description }}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div class="lg:col-span-1">
            <div class="sticky top-28">
              <Card>
                <CardHeader>
                  <CardTitle class="flex items-center gap-2">
                    <svg
                      class="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      ></path>
                    </svg>
                    Ringkasan Pesanan
                  </CardTitle>
                </CardHeader>
                <CardContent class="space-y-4">
                  <div class="space-y-3 max-h-64 overflow-y-auto">
                    <div
                      v-for="item in cartStore.items"
                      :key="item.id"
                      class="flex items-center gap-3 p-3 border rounded-lg"
                    >
                      <img
                        :src="item.image"
                        :alt="item.title"
                        class="w-16 h-16 rounded-lg object-cover"
                      />
                      <div class="flex-1 min-w-0">
                        <h3 class="font-medium text-gray-900 text-sm truncate">{{ item.title }}</h3>
                        <div class="flex items-center gap-2 mt-1">
                          <button
                            @click="updateQuantity(item.id, item.quantity - 1)"
                            :disabled="item.quantity <= 1"
                            class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100 disabled:opacity-50"
                          >
                            -
                          </button>
                          <span class="text-sm font-medium">{{ item.quantity }}</span>
                          <button
                            @click="updateQuantity(item.id, item.quantity + 1)"
                            class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100"
                          >
                            +
                          </button>
                          <button
                            @click="removeItem(item.id)"
                            class="ml-auto text-red-500 hover:text-red-700"
                          >
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div class="text-right">
                        <p class="font-semibold text-gray-900 text-sm">
                          Rp {{ (item.price * item.quantity).toLocaleString('id-ID') }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="border-t pt-4 space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Subtotal ({{ cartStore.totalItems }} item)</span>
                      <span class="font-medium">Rp {{ subtotal.toLocaleString('id-ID') }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Ongkos Kirim</span>
                      <span class="font-medium">Rp {{ shippingCost.toLocaleString('id-ID') }}</span>
                    </div>
                    <div class="border-t pt-2 flex justify-between">
                      <span class="font-semibold text-gray-900">Total</span>
                      <span class="font-bold text-lg text-blue-600"
                        >Rp {{ totalPrice.toLocaleString('id-ID') }}</span
                      >
                    </div>
                  </div>
                  <Button
                    @click="processCheckout"
                    :disabled="
                      isProcessing ||
                      !shippingForm.fullName ||
                      !shippingForm.phone ||
                      !shippingForm.address
                    "
                    class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <svg
                      v-if="isProcessing"
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
                    {{ isProcessing ? 'Memproses...' : 'Buat Pesanan' }}
                  </Button>
                  <div class="text-center text-xs text-gray-500 mt-4">
                    <div class="flex items-center justify-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        ></path>
                      </svg>
                      Transaksi aman & terpercaya
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='radio']:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
