import { writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import axios from 'axios'
import { v4 as uuid } from 'uuid'

const ROOT_PATH = process.cwd()

export const createFolder = () => {
  const dirName = './products'

  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName)
  }
}

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

export const generateImage = async (image: string) => {
  const id = uuid()

  const imagePath = await saveImage(image, `${id}.webp`)

  if (imagePath) {
    console.log(`Image ${imagePath} saved`)
  }

  if (!imagePath) {
    console.log(`Image ${image} not found`)
  }

  return imagePath
}
