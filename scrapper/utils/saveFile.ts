import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'
import axios from 'axios'
import path from 'node:path'

const ROOT_PATH = process.cwd()

export const saveImage = async (src: string, name: string): Promise<string | undefined> => {
  const fileName = `/products/${name}`

  const imageUrl = path.join(ROOT_PATH, fileName)

  try {
    const { data } = await axios.get(src, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(data)
    sharp(buffer).webp().toFile(imageUrl)
    return fileName
  } catch (error) {
    return undefined
  }
}

export const saveJSON = async (JSONText: string): Promise<void> => {
  const filePath = path.join(ROOT_PATH, 'products/products.json')
  await writeFile(filePath, JSONText, 'utf-8')
  console.log('Created products JSON')
}
