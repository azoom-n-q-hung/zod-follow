import ky from 'ky-universal'
import { apis as zodiosApiDefinition } from '@azoom/zod-follow'
// eslint-disable-next-line import/named
import { KyZodios, KyPlugin } from 'zodios-plugin-ky'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const zodFollowApiClient = new KyZodios(
    runtimeConfig.public.API_BASE_URL,
    zodiosApiDefinition,
    { validate: 'none' }
  )
  zodFollowApiClient.use(
    KyPlugin({ kyInstance: createAPI(runtimeConfig.public.API_BASE_URL) })
  )
  const apis: any = { zodFollow: zodFollowApiClient }

  return {
    provide: { apis }
  }
})

function createAPI (baseURL: string) {
  return ky.create({
    prefixUrl: baseURL,
    timeout: 30000,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  })
}
