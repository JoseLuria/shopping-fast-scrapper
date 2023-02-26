import { scrape } from '../utils'
import { CATEGORIES_URLS, CATEGORIES_ITEM, CTEGORIES_ITEM_URL } from '../constants'
import { Category } from '../types'

export const getCategoryProducts = async () => {
  const productsUrls: Category[] = []

  for (const { url, category } of CATEGORIES_URLS) {
    const $ = await scrape(url)

    const hrefs = $(CATEGORIES_ITEM).map((_, el) => {
      const href = $(el).find(CTEGORIES_ITEM_URL).attr('href')
      return { url: href, category }
    })

    const categoryProducts = [...hrefs]

    categoryProducts.forEach(({ url, category }) => {
      if (url) {
        productsUrls.push({ url, category })
      }
    })
  }

  return productsUrls
}
