import * as cheerio from 'cheerio'
import axios from 'axios'

export const scrape = async (URL: string): Promise<cheerio.CheerioAPI> => {
  const res = await axios.get(URL)
  return cheerio.load(res.data)
}
