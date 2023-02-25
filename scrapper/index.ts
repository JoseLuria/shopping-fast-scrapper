import { getCategoryProducts } from './actions'
import { saveJSON } from './utils'

;(async () => {
  const categoryProducts = await getCategoryProducts()
  await saveJSON(JSON.stringify(categoryProducts))
})()
