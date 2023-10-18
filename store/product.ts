import { ProductCreateType } from '~/types/product'

export const useProductCreateStore = defineStore('productCreateStore', () => {
  const { $apis } = useNuxtApp()
  const isLoading = ref<boolean>(false)

  function createProduct (product: ProductCreateType) {
    isLoading.value = true
    return $apis.zodFollow.post('products', product).finally(() => {
      isLoading.value = false
    })
  }

  return { isLoading, createProduct }
})
