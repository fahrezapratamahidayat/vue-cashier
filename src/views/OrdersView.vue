<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AppHeader from '@/components/AppHeader.vue'
import { useOrdersStore } from '@/stores/orders'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const ordersStore = useOrdersStore()
const authStore = useAuthStore()

if (!authStore.isAuthenticated) {
  router.push('/login')
}

const selectedTab = ref<'all' | 'pending' | 'shipped' | 'delivered' | 'cancelled'>('all')

const filteredOrders = computed(() => {
  if (selectedTab.value === 'all') {
    return ordersStore.orders
  }
  return ordersStore.getOrdersByStatus(selectedTab.value)
})

const statusConfig = {
  pending: {
    label: 'Menunggu Konfirmasi',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: '⏳',
  },
  processing: {
    label: 'Diproses',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: '⚙️',
  },
  shipped: {
    label: 'Dikirim',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: '🚚',
  },
  delivered: {
    label: 'Selesai',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: '✅',
  },
  cancelled: {
    label: 'Dibatalkan',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: '❌',
  },
}

const tabCounts = computed(() => ({
  all: ordersStore.totalOrders,
  pending: ordersStore.getOrdersByStatus('pending').length,
  shipped: ordersStore.getOrdersByStatus('shipped').length,
  delivered: ordersStore.completedOrders.length,
  cancelled: ordersStore.getOrdersByStatus('cancelled').length,
}))

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatEstimatedDelivery = (dateString?: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const cancelOrder = (orderId: string) => {
  if (confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
    const success = ordersStore.cancelOrder(orderId)
    if (success) {
      alert('Pesanan berhasil dibatalkan')
    } else {
      alert('Pesanan tidak dapat dibatalkan')
    }
  }
}

const viewOrderDetails = (orderId: string) => {
  alert(`Melihat detail pesanan: ${orderId}`)
}

const reorder = (orderId: string) => {
  alert(`Pesan ulang: ${orderId}`)
}

onMounted(() => {
  if (ordersStore.orders.length === 0) {
    const sampleOrders = [
      {
        status: 'delivered' as const,
        items: [
          {
            id: 1,
            title: 'iPhone 15 Pro Max',
            price: 18999000,
            image: 'https://placehold.co/300x200',
            quantity: 1,
            slug: 'iphone-15-pro-max',
          },
        ],
        subtotal: 18999000,
        shippingCost: 25000,
        total: 19024000,
        shippingAddress: {
          fullName: 'John Doe',
          phone: '081234567890',
          address: 'Jl. Sudirman No. 123',
          city: 'Jakarta',
          postalCode: '12190',
        },
        shippingMethod: 'Express (1 hari)',
        paymentMethod: 'Transfer Bank',
        trackingNumber: 'TKV123456789',
      },
      {
        status: 'shipped' as const,
        items: [
          {
            id: 2,
            title: 'MacBook Pro M3',
            price: 25999000,
            image: 'https://placehold.co/300x200',
            quantity: 1,
            slug: 'macbook-pro-m3',
          },
        ],
        subtotal: 25999000,
        shippingCost: 35000,
        total: 26034000,
        shippingAddress: {
          fullName: 'John Doe',
          phone: '081234567890',
          address: 'Jl. Sudirman No. 123',
          city: 'Jakarta',
          postalCode: '12190',
        },
        shippingMethod: 'Same Day',
        paymentMethod: 'E-Wallet',
        trackingNumber: 'TKV987654321',
      },
      {
        status: 'pending' as const,
        items: [
          {
            id: 3,
            title: 'iPad Air M2',
            price: 8999000,
            image: 'https://placehold.co/300x200',
            quantity: 1,
            slug: 'ipad-air-m2',
          },
        ],
        subtotal: 8999000,
        shippingCost: 15000,
        total: 9014000,
        shippingAddress: {
          fullName: 'John Doe',
          phone: '081234567890',
          address: 'Jl. Sudirman No. 123',
          city: 'Jakarta',
          postalCode: '12190',
        },
        shippingMethod: 'Reguler (2-3 hari)',
        paymentMethod: 'COD',
      },
    ]

    sampleOrders.forEach((order) => {
      ordersStore.createOrder(order)
    })
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <div class="pt-24 pb-12">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Pesanan Saya</h1>
          <p class="text-gray-600">Kelola dan lacak semua pesanan Anda</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent class="p-6">
              <div class="flex items-center">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg
                    class="w-6 h-6 text-blue-600"
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
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Total Pesanan</p>
                  <p class="text-2xl font-bold text-gray-900">{{ ordersStore.totalOrders }}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent class="p-6">
              <div class="flex items-center">
                <div class="p-2 bg-yellow-100 rounded-lg">
                  <svg
                    class="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Menunggu</p>
                  <p class="text-2xl font-bold text-gray-900">
                    {{ ordersStore.pendingOrders.length }}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent class="p-6">
              <div class="flex items-center">
                <div class="p-2 bg-purple-100 rounded-lg">
                  <svg
                    class="w-6 h-6 text-purple-600"
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
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Dikirim</p>
                  <p class="text-2xl font-bold text-gray-900">
                    {{ ordersStore.getOrdersByStatus('shipped').length }}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent class="p-6">
              <div class="flex items-center">
                <div class="p-2 bg-green-100 rounded-lg">
                  <svg
                    class="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Selesai</p>
                  <p class="text-2xl font-bold text-gray-900">
                    {{ ordersStore.completedOrders.length }}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card class="mb-6">
          <CardContent class="p-0">
            <div class="flex border-b">
              <button
                v-for="(tab, key) in {
                  all: 'Semua',
                  pending: 'Menunggu',
                  shipped: 'Dikirim',
                  delivered: 'Selesai',
                  cancelled: 'Dibatalkan',
                }"
                :key="key"
                @click="selectedTab = key as any"
                :class="[
                  'px-6 py-4 text-sm font-medium border-b-2 transition-colors',
                  selectedTab === key
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50',
                ]"
              >
                {{ tab }}
                <span
                  v-if="tabCounts[key as keyof typeof tabCounts] > 0"
                  :class="[
                    'ml-2 px-2 py-1 text-xs rounded-full',
                    selectedTab === key ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600',
                  ]"
                >
                  {{ tabCounts[key as keyof typeof tabCounts] }}
                </span>
              </button>
            </div>
          </CardContent>
        </Card>
        <div class="space-y-6">
          <div v-if="filteredOrders.length === 0" class="text-center py-12">
            <svg
              class="w-16 h-16 mx-auto text-gray-300 mb-4"
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
            <h3 class="text-lg font-medium text-gray-900 mb-2">Belum ada pesanan</h3>
            <p class="text-gray-500 mb-6">Mulai berbelanja dan buat pesanan pertama Anda</p>
            <Button @click="router.push('/products')" class="bg-blue-600 hover:bg-blue-700">
              Mulai Belanja
            </Button>
          </div>
          <Card v-for="order in filteredOrders" :key="order.id" class="overflow-hidden">
            <CardHeader class="bg-gray-50 border-b">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div class="flex flex-col md:flex-row md:items-center gap-4">
                  <div>
                    <CardTitle class="text-lg">{{ order.orderNumber }}</CardTitle>
                    <p class="text-sm text-gray-600">{{ formatDate(order.date) }}</p>
                  </div>
                  <div
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border',
                      statusConfig[order.status].color,
                    ]"
                  >
                    <span class="mr-1">{{ statusConfig[order.status].icon }}</span>
                    {{ statusConfig[order.status].label }}
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-gray-900">
                    Rp {{ order.total.toLocaleString('id-ID') }}
                  </p>
                  <p class="text-sm text-gray-600">{{ order.items.length }} item</p>
                </div>
              </div>
            </CardHeader>
            <CardContent class="p-6">
              <div class="space-y-4 mb-6">
                <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4">
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="w-16 h-16 rounded-lg object-cover"
                  />
                  <div class="flex-1">
                    <h3 class="font-medium text-gray-900">{{ item.title }}</h3>
                    <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-medium text-gray-900">
                      Rp {{ (item.price * item.quantity).toLocaleString('id-ID') }}
                    </p>
                  </div>
                </div>
              </div>
              <div
                v-if="order.status === 'shipped' || order.status === 'delivered'"
                class="bg-blue-50 rounded-lg p-4 mb-6"
              >
                <div class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 text-blue-600 mt-0.5"
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
                  <div>
                    <h4 class="font-medium text-blue-900">Informasi Pengiriman</h4>
                    <p class="text-sm text-blue-700 mt-1">
                      No. Resi: <span class="font-medium">{{ order.trackingNumber }}</span>
                    </p>
                    <p v-if="order.estimatedDelivery" class="text-sm text-blue-700">
                      Estimasi tiba: {{ formatEstimatedDelivery(order.estimatedDelivery) }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" @click="viewOrderDetails(order.id)" class="flex-1">
                  Lihat Detail
                </Button>
                <Button
                  v-if="order.status === 'delivered'"
                  variant="outline"
                  @click="reorder(order.id)"
                  class="flex-1"
                >
                  Pesan Lagi
                </Button>
                <Button
                  v-if="order.status === 'pending' || order.status === 'processing'"
                  variant="outline"
                  @click="cancelOrder(order.id)"
                  class="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                >
                  Batalkan Pesanan
                </Button>
                <Button
                  v-if="order.status === 'delivered'"
                  class="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Beri Ulasan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
