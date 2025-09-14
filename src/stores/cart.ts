import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  slug: string
}

export const useCartStore = defineStore('cart', () => {
  // Load initial data from localStorage
  const savedItems = localStorage.getItem('cart-items')
  const items = ref<CartItem[]>(savedItems ? JSON.parse(savedItems) : [])

  // Watch for changes and save to localStorage
  watch(items, (newItems) => {
    localStorage.setItem('cart-items', JSON.stringify(newItems))
  }, { deep: true })

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  const addToCart = (product: {
    id: number
    title: string
    price: number
    images: string[]
    slug: string
  }) => {
    const existingItem = items.value.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0] || 'https://placehold.co/300x200',
        quantity: 1,
        slug: product.slug,
      })
    }
  }

  const removeFromCart = (productId: number) => {
    const index = items.value.findIndex((item) => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const item = items.value.find((item) => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const isInCart = (productId: number) => {
    return items.value.some((item) => item.id === productId)
  }

  const getItemQuantity = (productId: number) => {
    const item = items.value.find((item) => item.id === productId)
    return item ? item.quantity : 0
  }

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  }
})
