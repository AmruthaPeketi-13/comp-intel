import Link from 'next/link'

export default function Home() {
  const popularCompanies = ['google', 'microsoft', 'flipkart', 'amazon', 'zomato', 'swiggy']

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Compensation by <span className="text-blue-600">level</span>, not title.
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          The most accurate compensation intelligence for tech professionals in India and beyond. Decision-ready insights powered by standardized levels.
        </p>

        <div className="max-w-xl mx-auto mb-16">
          <form action="/salaries" method="GET" className="flex gap-2">
            <input
              name="company"
              type="text"
              placeholder="Search by company (e.g. Google)"
              className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-lg"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition shadow-lg"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-20">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest w-full mb-2">Popular Companies</span>
          {popularCompanies.map((company) => (
            <Link
              key={company}
              href={`/company/${company}`}
              className="px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition shadow-sm capitalize"
            >
              {company}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <Link href="/salaries" className="p-8 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-2">Browse Salaries</h3>
            <p className="text-gray-500">Explore standardized pay data across thousands of entries.</p>
          </Link>
          <Link href="/compare" className="p-8 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-2">Compare Roles</h3>
            <p className="text-gray-500">Side-by-side comparison of total compensation across companies.</p>
          </Link>
          <div className="p-8 bg-blue-600 text-white border border-blue-600 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">Contribute</h3>
            <p className="text-blue-100">Help the community by sharing your anonymized compensation data.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
