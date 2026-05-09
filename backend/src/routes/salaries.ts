import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { normalizeCompany, computeTotal } from '../utils/normalize'

const router = Router()

const SalarySchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  level: z.string().regex(/^L\d+$/i, "Level must be L3, L4, L5 etc."),
  location: z.string().min(1),
  experience_years: z.number().int().min(0),
  base_salary: z.number().positive(),
  bonus: z.number().min(0).optional().default(0),
  stock: z.number().min(0).optional().default(0),
  confidence_score: z.number().min(0).max(1).optional().default(0.8),
})

// POST /ingest-salary
router.post('/ingest-salary', async (req, res) => {
  try {
    const parsed = SalarySchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues })
    }
    
    const d = parsed.data
    const total = computeTotal(d.base_salary, d.bonus, d.stock)
    
    const row = await prisma.salary.create({
      data: {
        ...d,
        company: normalizeCompany(d.company),
        total_compensation: total,
      }
    })
    
    res.status(201).json(row)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /salaries
router.get('/salaries', async (req, res) => {
  try {
    const { company, role, level, location } = req.query
    
    const rows = await prisma.salary.findMany({
      where: {
        ...(company && { company: { contains: normalizeCompany(String(company)) } }),
        ...(role && { role: { contains: String(role), mode: 'insensitive' } }),
        ...(level && { level: String(level).toUpperCase() }),
        ...(location && { location: { contains: String(location), mode: 'insensitive' } }),
      },
      orderBy: { total_compensation: 'desc' },
    })
    
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /company/:company
router.get('/company/:company', async (req, res) => {
  try {
    const companyName = normalizeCompany(req.params.company)
    const rows = await prisma.salary.findMany({
      where: { company: companyName }
    })
    
    if (!rows.length) {
      return res.status(404).json({ error: 'Company not found' })
    }
    
    const totals = rows.map(r => Number(r.total_compensation)).sort((a, b) => a - b)
    const mid = Math.floor(totals.length / 2)
    const median = totals.length % 2 !== 0 
      ? totals[mid] 
      : (totals[mid - 1] + totals[mid]) / 2
      
    const levelDist = rows.reduce((acc, r) => {
      acc[r.level] = (acc[r.level] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    res.json({
      company: companyName,
      rows,
      median_total_compensation: median,
      level_distribution: levelDist
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /compare
router.get('/compare', async (req, res) => {
  try {
    const { id1, id2 } = req.query
    if (!id1 || !id2) {
      return res.status(400).json({ error: 'id1 and id2 required' })
    }
    
    const [a, b] = await Promise.all([
      prisma.salary.findUnique({ where: { id: String(id1) } }),
      prisma.salary.findUnique({ where: { id: String(id2) } }),
    ])
    
    if (!a) return res.status(404).json({ error: 'id1 not found' })
    if (!b) return res.status(404).json({ error: 'id2 not found' })
    
    res.json({
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
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
