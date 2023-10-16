import { z } from 'zod'
import { getEndpointResponseSchema, getEndpointRequestSchema } from '@azoom/abo'

export const CustomerSchema = getEndpointResponseSchema({ path: '/customers', method: 'get' })
export type Customer = z.infer<typeof CustomerSchema>

export interface CustomerSearchParams {
  id?: string | null;
  customerName?: string | null;
  contactName?: string | null;
  tel?: string | null;
  orderBy?: number;
  page: number;
  limit: number;
}

export const CustomerCreatePayloadSchema = getEndpointRequestSchema({ path: '/customers', method: 'post', paramName: 'customer' })
export type CustomerCreatePayload = z.infer<typeof CustomerCreatePayloadSchema>

export const CustomerEditPayloadSchema = getEndpointRequestSchema({ path: '/customers/:id', method: 'patch', paramName: 'customer' })
export type CustomerEditPayload = z.infer<typeof CustomerEditPayloadSchema>

export const sortTypes = generateConstants({
  id: { value: 1, label: '顧客番号順' },
  amountOfBookings: { value: 2, label: '利用回数順' },
  amountOfMoney: { value: 3, label: '利用金額順' }
})

export const useCustomerStore = defineStore('customer', () => {
  const { $apis } = useNuxtApp()
  const customers = ref<Customer[]>([])
  const customerSearchParams = ref<CustomerSearchParams>({
    id: null,
    customerName: null,
    contactName: null,
    tel: null,
    orderBy: 1,
    page: 1,
    limit: 50
  })
  const totalCustomer = ref<number>(0)
  const isLoading = ref<boolean>(false)

  async function fetchCustomers () {
    isLoading.value = true
    const searchParams = sanitizeObject(customerSearchParams.value)
    const response = await $apis.abo
      .get('customers', { searchParams })
      .finally(() => {
        isLoading.value = false
      })

    totalCustomer.value = +response.headers.get('X-Total-Count')
    customers.value = await response.json()
  }

  return {
    customers,
    customerSearchParams,
    totalCustomer,
    isLoading,
    fetchCustomers
  }
})

export const useCustomerCreateStore = defineStore('customerCreateStore', () => {
  const { $apis } = useNuxtApp()
  const isLoading = ref<boolean>(false)

  function createCustomer (customer: CustomerCreatePayload) {
    isLoading.value = true
    return $apis.abo
      .post('customers', customer)
  }

  return { isLoading, createCustomer }
})

export const useCustomerEditStore = defineStore('customerEditStore', () => {
  const { $apis } = useNuxtApp()
  const customer = ref<CustomerEditPayload>({})
  const isLoading = ref<boolean>(false)

  async function fetchCustomer (roomId: number) {
    customer.value = await $apis.abo.get(`customers/${roomId}`).json()
  }

  function updateCustomer (customerId: number, customer: CustomerEditPayload) {
    isLoading.value = true
    return $apis.abo
      .patch(`customers/${customerId}`, customer)
      .json()
      .finally(() => {
        isLoading.value = false
      })
  }

  return { customer, isLoading, fetchCustomer, updateCustomer }
})
