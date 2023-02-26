import { Category } from '../types'
import { PRODUCT_SELECTORS, PRODUCTS_REMOVE_PROPERTIES } from '../constants'
import { scrape, createSlug, formatDiscount, createStock, formatNumber } from '../utils'

export const getIndividualProduct = async ({ url, category }: Category) => {
  const $ = await scrape(url)
  const data: any = { category }

  PRODUCT_SELECTORS.forEach(({ attr, iterator, name, selector }) => {
    const el = $(selector)

    if (!iterator) {
      const value = attr ? el.attr(attr) : el.text().trim()
      data[name] = value
    } else {
      const values: any[] = []

      el.each((_, it) => {
        iterator.forEach(({ attr, find, name }) => {
          const el = $(it)
          const iteratorValue = attr ? el.attr(attr) : el.find(find).text().trim()
          values.push({ name, value: iteratorValue })
        })
      })

      data[name] = iterator.length > 1 ? values : values.map(({ value }: any) => value)
    }
  })

  const { imagesElements, imageContainer, priceUnique, priceOld, discount } = data

  data.discount = discount ? formatDiscount(discount) : null
  data.images = [imageContainer, ...imagesElements]
  data.price = formatNumber(data.price)
  data.price = priceUnique || priceOld
  data.slug = createSlug(data.name)
  data.stock = createStock()

  PRODUCTS_REMOVE_PROPERTIES.forEach((value) => {
    delete data[value]
  })

  return data
}
