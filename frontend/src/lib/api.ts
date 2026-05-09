const staticSalaries = [
  { id: '1', company: 'google', role: 'Software Engineer', level: 'L3', location: 'Bangalore', experience_years: 1, base_salary: 1800000, bonus: 200000, stock: 400000, total_compensation: 2400000, confidence_score: 0.9 },
  { id: '2', company: 'google', role: 'Software Engineer', level: 'L4', location: 'Bangalore', experience_years: 4, base_salary: 3000000, bonus: 400000, stock: 1200000, total_compensation: 4600000, confidence_score: 0.95 },
  { id: '3', company: 'google', role: 'Software Engineer', level: 'L5', location: 'Bangalore', experience_years: 8, base_salary: 5000000, bonus: 1000000, stock: 2500000, total_compensation: 8500000, confidence_score: 0.92 },
  { id: '4', company: 'microsoft', role: 'Software Engineer', level: 'L3', location: 'Hyderabad', experience_years: 1, base_salary: 1600000, bonus: 150000, stock: 300000, total_compensation: 2050000, confidence_score: 0.88 },
  { id: '5', company: 'microsoft', role: 'Software Engineer', level: 'L4', location: 'Hyderabad', experience_years: 5, base_salary: 2600000, bonus: 300000, stock: 800000, total_compensation: 3700000, confidence_score: 0.91 },
  { id: '6', company: 'microsoft', role: 'Software Engineer', level: 'L5', location: 'Hyderabad', experience_years: 9, base_salary: 4500000, bonus: 800000, stock: 2000000, total_compensation: 7300000, confidence_score: 0.89 },
  { id: '7', company: 'amazon', role: 'Software Engineer', level: 'L3', location: 'Bangalore', experience_years: 2, base_salary: 1700000, bonus: 300000, stock: 200000, total_compensation: 2200000, confidence_score: 0.87 },
  { id: '8', company: 'amazon', role: 'Software Engineer', level: 'L4', location: 'Bangalore', experience_years: 6, base_salary: 2800000, bonus: 500000, stock: 700000, total_compensation: 4000000, confidence_score: 0.93 },
  { id: '9', company: 'flipkart', role: 'Software Engineer', level: 'L3', location: 'Bangalore', experience_years: 1, base_salary: 1500000, bonus: 150000, stock: 150000, total_compensation: 1800000, confidence_score: 0.85 },
  { id: '10', company: 'flipkart', role: 'Software Engineer', level: 'L4', location: 'Bangalore', experience_years: 4, base_salary: 2400000, bonus: 250000, stock: 400000, total_compensation: 3050000, confidence_score: 0.89 },
]

export const getSalaries = async (params: any = {}) => {
  let filtered = [...staticSalaries]
  
  if (params.company) {
    filtered = filtered.filter(s => s.company.includes(params.company.toLowerCase()))
  }
  if (params.role) {
    filtered = filtered.filter(s => s.role.toLowerCase().includes(params.role.toLowerCase()))
  }
  if (params.level) {
    filtered = filtered.filter(s => s.level === params.level.toUpperCase())
  }
  
  return filtered.sort((a, b) => b.total_compensation - a.total_compensation)
}

export const getCompany = async (slug: string) => {
  const companyName = slug.toLowerCase()
  const rows = staticSalaries.filter(s => s.company === companyName)
  
  if (!rows.length) throw new Error('Company not found')
  
  const totals = rows.map(r => r.total_compensation).sort((a, b) => a - b)
  const mid = Math.floor(totals.length / 2)
  const median = totals.length % 2 !== 0 
    ? totals[mid] 
    : (totals[mid - 1] + totals[mid]) / 2
    
  const levelDist = rows.reduce((acc, r) => {
    acc[r.level] = (acc[r.level] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return {
    company: companyName,
    rows,
    median_total_compensation: median,
    level_distribution: levelDist
  }
}

export const getCompare = async (id1: string, id2: string) => {
  const a = staticSalaries.find(s => s.id === id1)
  const b = staticSalaries.find(s => s.id === id2)
  
  if (!a || !b) throw new Error('Comparison failed')
  
  return {
    a: {
      company: a.company,
      role: a.role,
      level: a.level,
      base: a.base_salary,
      bonus: a.bonus,
      stock: a.stock,
      total: a.total_compensation
    },
    b: {
      company: b.company,
      role: b.role,
      level: b.level,
      base: b.base_salary,
      bonus: b.bonus,
      stock: b.stock,
      total: b.total_compensation
    },
    level_difference: `${a.level} vs ${b.level}`
  }
}

export const ingestSalary = async (body: object) => {
  return { success: true, message: "Mock ingestion successful" }
}
