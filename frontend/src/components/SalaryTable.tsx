import React from 'react'

interface SalaryRow {
  id: string
  company: string
  role: string
  level: string
  location: string
  experience_years: number
  total_compensation: number
}

interface SalaryTableProps {
  rows: SalaryRow[]
}

export const SalaryTable: React.FC<SalaryTableProps> = ({ rows }) => {
  if (rows.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 border rounded-lg">
        <p className="text-gray-500">No results found matching your criteria.</p>
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
    <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exp (Yrs)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Comp</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 capitalize">
                <a href={`/company/${row.company}`}>{row.company}</a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs font-bold uppercase">{row.level}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.location}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.experience_years}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{formatCurrency(row.total_compensation)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
