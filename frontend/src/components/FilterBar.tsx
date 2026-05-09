import React from 'react'

interface Filters {
  company: string
  role: string
  level: string
  location: string
}

interface FilterBarProps {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-6 bg-white border rounded-xl shadow-sm">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Company</label>
        <input
          type="text"
          name="company"
          value={filters.company}
          onChange={handleChange}
          placeholder="e.g. Google"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Role</label>
        <input
          type="text"
          name="role"
          value={filters.role}
          onChange={handleChange}
          placeholder="e.g. SDE"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Level</label>
        <select
          name="level"
          value={filters.level}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        >
          <option value="">All Levels</option>
          <option value="L3">L3</option>
          <option value="L4">L4</option>
          <option value="L5">L5</option>
          <option value="L6">L6</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Location</label>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="e.g. Bangalore"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />
      </div>
    </div>
  )
}
