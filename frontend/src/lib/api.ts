const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export const getSalaries = (params = {}) => {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.append(key, String(value))
  })
  return fetch(`${BASE}/salaries?${query}`).then(r => r.json())
}

export const getCompany = (slug: string) =>
  fetch(`${BASE}/company/${slug}`).then(r => {
    if (!r.ok) throw new Error('Company not found')
    return r.json()
  })

export const getCompare = (id1: string, id2: string) =>
  fetch(`${BASE}/compare?id1=${id1}&id2=${id2}`).then(r => {
    if (!r.ok) throw new Error('Comparison failed')
    return r.json()
  })

export const ingestSalary = (body: object) =>
  fetch(`${BASE}/ingest-salary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(r => r.json())
