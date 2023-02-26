import { z } from 'zod'
import { productSchema } from '../validations'

export type Product = z.infer<typeof productSchema>
