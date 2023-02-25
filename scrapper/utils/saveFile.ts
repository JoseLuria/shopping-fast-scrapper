import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT_PATH = process.cwd()

export const saveImage = async (src: string, name: string): Promise<string> => {
  const fileName = `/data/static/${name}`

  const imageUrl = path.join(ROOT_PATH, fileName)

  const responseImage = await fetch(src)
  const arrayBuffer = await responseImage.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  await writeFile(imageUrl, buffer)

  return fileName
}

export const saveJSON = async (JSONText: string): Promise<void> => {
  const filePath = path.join(ROOT_PATH, 'data/products.json')
  await writeFile(filePath, JSONText, 'utf-8')
  console.log('Created products JSON')
}
