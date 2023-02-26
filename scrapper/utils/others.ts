export const formatNumber = (text: string): number => {
  const onlyNumbers = text.replace(/[^0-9]+/g, '')
  return Number(onlyNumbers)
}

export const createSlug = (text: string): string => {
  const cleanText = text.replace(/[^a-zA-Z0-9 ]/g, '')
  const lowerText = cleanText.toLowerCase()
  return lowerText.replaceAll(/[\s+()-]/g, '-')
}

export const formatDiscount = (text: string): number => {
  const discountText = text.split('(')[1]
  return formatNumber(discountText)
}

export const createStock = (): number => {
  return Math.floor(Math.random() * (250 - 0) + 0)
}
