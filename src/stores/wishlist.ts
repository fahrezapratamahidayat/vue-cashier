import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface WishlistItem {
  id: number
  title: string
  price: number
  image: string
  slug: string
  addedAt: Date
}

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<WishlistItem[]>([])

  const totalItems = computed(() => {
    return items.value.length
  })

  const addToWishlist = (product: {
    id: number
    title: string
    price: number
    images: string[]
    slug: string
  }) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (!existingItem) {
      items.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0] || 'https://placehold.co/300x200',
        slug: product.slug,
        addedAt: new Date()
      })
    }
  }

  const removeFromWishlist = (productId: number) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const clearWishlist = () => {
    items.value = []
  }

  const isInWishlist = (productId: number) => {
    return items.value.some(item => item.id === productId)
  }

  return {
    items,
    totalItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist
  }
})
