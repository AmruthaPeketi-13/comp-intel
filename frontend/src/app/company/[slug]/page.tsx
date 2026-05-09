import React from 'react'
import { SalaryTable } from '@/components/SalaryTable'

export const dynamic = 'force-dynamic'

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

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const companyName = slug.toLowerCase()
  
  const rows = staticSalaries.filter(s => s.company === companyName)
  
  if (!rows.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-500">We couldn't find any data for "{slug}"</p>
          <a href="/" className="mt-6 inline-block text-blue-600 font-bold hover:underline">Back to Home</a>
        </div>
      </div>
    )
  }

  const totals = rows.map(r => r.total_compensation).sort((a, b) => a - b)
  const mid = Math.floor(totals.length / 2)
  const median = totals.length % 2 !== 0 
    ? totals[mid] 
    : (totals[mid - 1] + totals[mid]) / 2
    
  const levelDist = rows.reduce((acc, r) => {
    acc[r.level] = (acc[r.level] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 capitalize mb-2">{companyName}</h1>
            <p className="text-gray-500 font-medium">Compensation Insights & Data</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Median Total Comp</span>
            <span className="text-3xl font-black text-gray-900">{formatCurrency(median)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="text-lg font-bold mb-6">Level Distribution</h3>
            <div className="space-y-4">
              {Object.entries(levelDist).map(([level, count]) => {
                const total = rows.length
                const percentage = (count as number / total) * 100
                return (
                  <div key={level}>
                    <div className="flex justify-between text-sm font-bold mb-1 uppercase">
                      <span>{level}</span>
                      <span>{count as number} entries</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">Detailed Data</h3>
            <SalaryTable rows={rows as any} />
          </div>
        </div>
      </div>
    </div>
  )
}
