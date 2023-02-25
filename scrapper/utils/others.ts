export const formatNumber = (text: string): number => {
  const onlyNumbers = text.replace(/[^0-9]+/g, '')
  return Number(onlyNumbers)
}
