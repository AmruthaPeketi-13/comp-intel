import React from 'react'
import { getCompany } from '@/lib/api'
import { SalaryTable } from '@/components/SalaryTable'

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let data = null
  let error = null

  try {
    data = await getCompany(slug)
  } catch (e) {
    error = 'Company not found'
  }

  if (error || !data) {
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
            <h1 className="text-4xl font-extrabold text-gray-900 capitalize mb-2">{data.company}</h1>
            <p className="text-gray-500 font-medium">Compensation Insights & Data</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Median Total Comp</span>
            <span className="text-3xl font-black text-gray-900">{formatCurrency(data.median_total_compensation)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="text-lg font-bold mb-6">Level Distribution</h3>
            <div className="space-y-4">
              {Object.entries(data.level_distribution).map(([level, count]) => {
                const total = data.rows.length
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
            <SalaryTable rows={data.rows} />
          </div>
        </div>
      </div>
    </div>
  )
}
