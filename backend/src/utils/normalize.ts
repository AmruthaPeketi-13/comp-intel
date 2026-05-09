export const normalizeCompany = (name: string) =>
  name.trim().toLowerCase().replace(/\s+/g, ' ')

export const computeTotal = (base: number, bonus = 0, stock = 0) =>
  base + bonus + stock
