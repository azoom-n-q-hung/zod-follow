import { z } from 'zod'
import { getEndpointRequestSchema } from '@azoom/zod-follow'

export const CustomerCreateSchema = getEndpointRequestSchema({
  path: '/customers',
  method: 'post',
  paramName: 'customer'
})

export type CustomerCreateType = z.infer<typeof CustomerCreateSchema>
