const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const companies = ["google", "microsoft", "amazon", "flipkart", "swiggy", "zepto", "zomato", "meta", "apple", "netflix"]
const roles = ["Software Engineer", "Frontend Engineer", "Backend Engineer", "Fullstack Engineer", "Mobile Engineer"]
const locations = ["Bangalore", "Hyderabad", "Pune", "Gurgaon", "San Francisco", "New York", "London", "Seattle"]
const levels = ["L3", "L4", "L5", "L6"]

async function main() {
  console.log('Seeding data...')
  
  const data = []

  for (let i = 0; i < 60; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)]
    const role = roles[Math.floor(Math.random() * roles.length)]
    const level = levels[Math.floor(Math.random() * levels.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    
    let base = 0, bonus = 0, stock = 0, exp = 0
    
    if (level === "L3") {
      base = 1500000 + Math.random() * 1000000
      bonus = base * 0.1
      stock = base * 0.2
      exp = Math.floor(Math.random() * 3)
    } else if (level === "L4") {
      base = 2500000 + Math.random() * 1500000
      bonus = base * 0.15
      stock = base * 0.4
      exp = 3 + Math.floor(Math.random() * 4)
    } else if (level === "L5") {
      base = 4000000 + Math.random() * 2500000
      bonus = base * 0.2
      stock = base * 0.7
      exp = 7 + Math.floor(Math.random() * 5)
    } else {
      base = 7000000 + Math.random() * 4000000
      bonus = base * 0.25
      stock = base * 1.2
      exp = 12 + Math.floor(Math.random() * 10)
    }

    const b = Math.round(base)
    const bo = Math.round(bonus)
    const s = Math.round(stock)
    const total = b + bo + s

    data.push({
      company,
      role,
      level,
      location,
      experience_years: exp,
      base_salary: b,
      bonus: bo,
      stock: s,
      total_compensation: total,
      confidence_score: 0.8 + (Math.random() * 0.2)
    })
  }

  for (const item of data) {
    await prisma.salary.create({ data: item })
  }

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
