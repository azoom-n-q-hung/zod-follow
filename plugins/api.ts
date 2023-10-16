import ky from 'ky-universal'
import { apis as zodiosApiDefinition } from '@azoom/abo'
// eslint-disable-next-line import/named
import { KyZodios, KyPlugin } from 'zodios-plugin-ky'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const aboApiClient = new KyZodios(runtimeConfig.public.API_BASE_URL, zodiosApiDefinition, { validate: 'none' })
  aboApiClient.use(KyPlugin({ kyInstance: createAPI(runtimeConfig.public.API_BASE_URL) }))
  const apis: any = { abo: aboApiClient }

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
