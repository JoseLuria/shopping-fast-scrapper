import { v4 as uuid } from 'uuid'
import { Category } from '../types'
import { PRODUCT_SELECTORS, PRODUCTS_REMOVE_PROPERTIES } from '../constants'
import { scrape, createSlug, formatDiscount, createStock, formatNumber, saveImage } from '../utils'

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

  const images: string[] = []

  const productImages = [imageContainer, ...imagesElements]

  for await (const image of productImages) {
    const id = uuid()

    try {
      const imagePath = await saveImage(image, `${id}.jpg`)
      images.push(imagePath)
      console.log(`Image ${imagePath} saved`)
    } catch (error) {
      console.log(`Image ${image} from product ${data.name} not found`)
    }
  }

  data.images = images

  PRODUCTS_REMOVE_PROPERTIES.forEach((value) => {
    delete data[value]
  })

  return data
}
