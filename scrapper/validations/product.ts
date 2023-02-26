import { z } from 'zod'

export const productSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  price: z.number(),
  discount: z.number(),
  category: z.string().min(1),
  stock: z.number(),
  description: z.string().min(1),
  images: z.string().min(1),
  properties: z
    .array(
      z.object({
        name: z.string().min(1),
        value: z.string().min(1)
      })
    )
    .min(1)
})
