import { CustomerCreateType } from '~/types/customer'

export const useCustomerCreateStore = defineStore('customerCreateStore', () => {
  const { $apis } = useNuxtApp()
  const isLoading = ref<boolean>(false)

  function createCustomer (customer: CustomerCreateType) {
    isLoading.value = true
    return $apis.zodFollow.post('customers', customer).finally(() => {
      isLoading.value = false
    })
  }

  return { isLoading, createCustomer }
})
