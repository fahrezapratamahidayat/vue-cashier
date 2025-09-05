<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface Category {
  id: number
  name: string
  slug: string
  image: string
}

interface Product {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: Category
  images: string[]
}

const props = defineProps<{
  product: Product
}>()
</script>

<template>
  <Card
    class="group flex flex-col overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white hover:cursor-pointer p-0"
  >
    <RouterLink
      :to="{ name: 'productDetails', params: { slug: product.slug } }"
      class="flex flex-col flex-1"
    >
      <div class="relative overflow-hidden">
        <div class="w-full h-56 relative overflow-hidden">
          <img
            :src="product.images[0]"
            :alt="product.title"
            class="w-full h-full object-cover"
            @error="($event.target as HTMLImageElement).src = 'https://placehold.co/600x400'"
          />
          <div
            class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"
          ></div>
        </div>
      </div>
      <div class="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3
            class="text-lg h-14 font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2"
          >
            {{ product.title.length > 40 ? product.title.slice(0, 35) + '...' : product.title }}
          </h3>
          <p class="text-gray-600 mb-4 text-sm leading-relaxed">
            {{
              product.description.length > 100
                ? product.description.slice(0, 100) + '...'
                : product.description
            }}
          </p>
        </div>
        <div class="mt-auto">
          <div class="flex items-center justify-between mb-4">
            <span class="text-2xl font-bold text-gray-900">
              Rp {{ product.price.toLocaleString('id-ID') }}
            </span>
            <span
              class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-semibold group-hover:bg-blue-200 transition-colors duration-300"
            >
              {{ product.category.name }}
            </span>
          </div>
          <Button
            size="sm"
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Tambah ke Keranjang
          </Button>
        </div>
      </div>
    </RouterLink>
  </Card>
</template>
