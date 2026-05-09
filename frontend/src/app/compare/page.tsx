'use client'

import React, { useState, useEffect } from 'react'
import { getSalaries, getCompare } from '@/lib/api'

export default function ComparePage() {
  const [allSalaries, setAllSalaries] = useState<any[]>([])
  const [id1, setId1] = useState('')
  const [id2, setId2] = useState('')
  const [comparison, setComparison] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getSalaries().then(setAllSalaries)
  }, [])

  const handleCompare = async () => {
    if (!id1 || !id2) return
    setLoading(true)
    setError('')
    try {
      const data = await getCompare(id1, id2)
      setComparison(data)
    } catch (e) {
      setError('Failed to fetch comparison data')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  const Row = ({ label, valA, valB, isBold = false }: any) => {
    const isHigherA = valA > valB
    const isHigherB = valB > valA
    
    return (
      <div className="grid grid-cols-3 border-b py-4">
        <div className="text-gray-500 font-medium">{label}</div>
        <div className={`${isBold ? 'font-black text-lg' : 'text-gray-900 font-semibold'} ${isHigherA ? 'text-green-600' : ''}`}>
          {typeof valA === 'number' ? formatCurrency(valA) : valA}
        </div>
        <div className={`${isBold ? 'font-black text-lg' : 'text-gray-900 font-semibold'} ${isHigherB ? 'text-green-600' : ''}`}>
          {typeof valB === 'number' ? formatCurrency(valB) : valB}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Compare Compensation</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 border rounded-xl shadow-sm">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Salary A</label>
            <select 
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={id1}
              onChange={(e) => setId1(e.target.value)}
            >
              <option value="">Select a salary...</option>
              {allSalaries.map((s: any) => (
                <option key={s.id} value={s.id}>
                  {s.company} - {s.role} ({s.level})
                </option>
              ))}
            </select>
          </div>
          <div className="bg-white p-6 border rounded-xl shadow-sm">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Salary B</label>
            <select 
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={id2}
              onChange={(e) => setId2(e.target.value)}
            >
              <option value="">Select a salary...</option>
              {allSalaries.map((s: any) => (
                <option key={s.id} value={s.id}>
                  {s.company} - {s.role} ({s.level})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button 
          onClick={handleCompare}
          disabled={!id1 || !id2 || loading}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 disabled:bg-gray-300 transition mb-12"
        >
          {loading ? 'Comparing...' : 'Compare Side-by-Side'}
        </button>

        {error && <div className="p-4 bg-red-100 text-red-600 rounded-lg mb-8">{error}</div>}

        {comparison && (
          <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 border-b p-6">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Field</div>
              <div className="text-lg font-black text-gray-900 capitalize">{comparison.a.company}</div>
              <div className="text-lg font-black text-gray-900 capitalize">{comparison.b.company}</div>
            </div>
            
            <div className="p-6">
              <Row label="Role" valA={comparison.a.role} valB={comparison.b.role} />
              <Row label="Level" valA={comparison.a.level} valB={comparison.b.level} />
              <Row label="Base Salary" valA={Number(comparison.a.base)} valB={Number(comparison.b.base)} />
              <Row label="Bonus" valA={Number(comparison.a.bonus)} valB={Number(comparison.b.bonus)} />
              <Row label="Stock" valA={Number(comparison.a.stock)} valB={Number(comparison.b.stock)} />
              <Row label="Total Compensation" valA={Number(comparison.a.total)} valB={Number(comparison.b.total)} isBold={true} />
              
              <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <span className="text-sm font-bold text-blue-600 uppercase tracking-widest block mb-1 text-center">Level Difference</span>
                <p className="text-center font-bold text-blue-900">{comparison.level_difference}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
