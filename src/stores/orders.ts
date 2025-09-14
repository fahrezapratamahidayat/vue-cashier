import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface OrderItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  slug: string
}

export interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  total: number
  shippingAddress: {
    fullName: string
    phone: string
    address: string
    city: string
    postalCode: string
    notes?: string
  }
  shippingMethod: string
  paymentMethod: string
  trackingNumber?: string
  estimatedDelivery?: string
}

export const useOrdersStore = defineStore('orders', () => {
  const savedOrders = localStorage.getItem('user-orders')
  const orders = ref<Order[]>(savedOrders ? JSON.parse(savedOrders) : [])

  watch(
    orders,
    (newOrders) => {
      localStorage.setItem('user-orders', JSON.stringify(newOrders))
    },
    { deep: true },
  )

  const totalOrders = computed(() => orders.value.length)

  const pendingOrders = computed(() =>
    orders.value.filter((order) => order.status === 'pending' || order.status === 'processing'),
  )

  const completedOrders = computed(() =>
    orders.value.filter((order) => order.status === 'delivered'),
  )

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substr(2, 4).toUpperCase()
    return `TKV${timestamp}${random}`
  }

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date'>) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      orderNumber: generateOrderNumber(),
      date: new Date().toISOString(),
      ...orderData,
    }

    orders.value.unshift(newOrder)
    return newOrder
  }

  const getOrderById = (orderId: string) => {
    return orders.value.find((order) => order.id === orderId)
  }

  const updateOrderStatus = (orderId: string, status: Order['status'], trackingNumber?: string) => {
    const order = orders.value.find((order) => order.id === orderId)
    if (order) {
      order.status = status
      if (trackingNumber) {
        order.trackingNumber = trackingNumber
      }

      if (status === 'shipped') {
        const deliveryDate = new Date()
        deliveryDate.setDate(deliveryDate.getDate() + 3)
        order.estimatedDelivery = deliveryDate.toISOString()
      }
    }
  }

  const getOrdersByStatus = (status: Order['status']) => {
    return orders.value.filter((order) => order.status === status)
  }

  const cancelOrder = (orderId: string) => {
    const order = orders.value.find((order) => order.id === orderId)
    if (order && (order.status === 'pending' || order.status === 'processing')) {
      order.status = 'cancelled'
      return true
    }
    return false
  }

  const clearOrders = () => {
    orders.value = []
  }

  return {
    orders,
    totalOrders,
    pendingOrders,
    completedOrders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    getOrdersByStatus,
    cancelOrder,
    clearOrders,
  }
})
