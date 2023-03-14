import { Category } from '../types'
import { PRODUCT_SELECTORS, PRODUCTS_REMOVE_PROPERTIES } from '../constants'
import {
  scrape,
  createSlug,
  formatDiscount,
  createStock,
  formatNumber,
  generateImage
} from '../utils'
import { productSchema } from '../validations'

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
        const data: any = {}

        iterator.forEach(({ attr, find, name }) => {
          const el = $(it)
          const iteratorValue = attr ? el.attr(attr) : el.find(find).text().trim()
          data[name] = iteratorValue
        })

        values.push(data)
      })

      data[name] = iterator.length > 1 ? values : values.map(({ image }: any) => image)
    }
  })

  const { imagesElements, imageContainer, priceUnique, priceOld, discount } = data

  data.discount = discount ? formatDiscount(discount) : null
  data.price = priceUnique || priceOld
  data.slug = createSlug(data.name)
  data.stock = createStock()
  data.price = formatNumber(data.price)

  PRODUCTS_REMOVE_PROPERTIES.forEach((value) => {
    delete data[value]
  })

  const validate = productSchema.safeParse(data)

  if (!validate.success) return

  const images: string[] = []

  for await (const image of imagesElements) {
    const resultImage = await generateImage(image)

    if (resultImage) {
      images.push(resultImage)
    }
  }

  if (images.length === 0) {
    const resultImage = await generateImage(imageContainer)

    if (resultImage) {
      images.push(resultImage)
    }
  }

  data.images = images

  return data
}
