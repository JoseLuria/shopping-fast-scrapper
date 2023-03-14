import { getCategoryProducts, getIndividualProduct } from './actions'
import { Product } from './types'
import { productSchema } from './validations'
import { saveJSON, createFolder } from './utils'

;(async () => {
  createFolder()

  const products: Product[] = []

  const categoryProducts = await getCategoryProducts()

  for await (const invidualProduct of categoryProducts) {
    const productData = await getIndividualProduct(invidualProduct)
    const validate = productSchema.safeParse(productData)
    if (validate.success) {
      const { data } = validate
      products.push(data)
      console.log(`Scrapped product ${data.name}`)
    }
  }

  await saveJSON(JSON.stringify(products))
})()
