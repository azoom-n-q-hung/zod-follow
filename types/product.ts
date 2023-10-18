import { z } from 'zod'
import { getEndpointRequestSchema } from '@azoom/zod-follow'

export const ProductCreateSchema = getEndpointRequestSchema({
  path: '/products',
  method: 'post',
  paramName: 'product'
})

export type ProductCreateType = z.infer<typeof ProductCreateSchema>
