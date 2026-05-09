'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getSalaries } from '@/lib/api'
import { SalaryTable } from '@/components/SalaryTable'
import { FilterBar } from '@/components/FilterBar'

import { Suspense } from 'react'

function SalariesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [filters, setFilters] = useState({
    company: searchParams.get('company') || '',
    role: searchParams.get('role') || '',
    level: searchParams.get('level') || '',
    location: searchParams.get('location') || '',
  })
  
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const salaries = await getSalaries(filters)
        setData(salaries)
      } catch (error) {
        console.error('Failed to fetch salaries', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    
    // Update URL params
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, val]) => {
      if (val) params.set(key, val)
    })
    const query = params.toString()
    router.replace(`/salaries${query ? `?${query}` : ''}`, { scroll: false })
  }, [filters, router])

  return (
    <div className="max-w-6xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Salary Database</h1>
      
      <FilterBar filters={filters} setFilters={setFilters} />
      
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <SalaryTable rows={data} />
      )}
    </div>
  )
}

export default function SalariesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Suspense fallback={
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
        <SalariesContent />
      </Suspense>
    </div>
  )
}
