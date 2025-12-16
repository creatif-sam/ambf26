import { useEffect, useMemo, useState } from "react"
import { fetchConferenceRegistrations } from "../services/registrations.service"

/* ================= CSV EXPORT ================= */
function exportToCSV(rows) {
  if (!rows.length) return

  const headers = [
    "Full Name",
    "Email",
    "Phone",
    "Organization",
    "Role",
    "Sector",
    "Country",
    "Submitted At"
  ]

  const csvContent = [
    headers.join(","),
    ...rows.map(r =>
      [
        `"${r.full_name}"`,
        `"${r.email}"`,
        `"${r.phone || ""}"`,
        `"${r.organization || ""}"`,
        `"${r.role || ""}"`,
        `"${r.sector || ""}"`,
        `"${r.country || ""}"`,
        `"${new Date(r.created_at).toISOString()}"`
      ].join(",")
    )
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = `conference_registrations_${Date.now()}.csv`
  link.click()

  URL.revokeObjectURL(url)
}

/* ================= PAGE ================= */
export default function ConferenceRegistrations() {
  const [registrations, setRegistrations] = useState([])
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState("")
  const [country, setCountry] = useState("")

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const { data } = await fetchConferenceRegistrations()
    setRegistrations(data || [])
  }

  const countries = useMemo(() => {
    return [...new Set(registrations.map(r => r.country).filter(Boolean))].sort()
  }, [registrations])

  const filtered = useMemo(() => {
    return registrations.filter(r => {
      const matchesSearch =
        `${r.full_name} ${r.email}`.toLowerCase().includes(search.toLowerCase())

      const matchesCountry =
        !country || r.country === country

      return matchesSearch && matchesCountry
    })
  }, [registrations, search, country])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ================= LIST ================= */}
      <section className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b flex flex-wrap gap-3 items-center">
          <input
            placeholder="Search name or email"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm w-full md:w-64 text-slate-900"
          />

          <select
            value={country}
            onChange={e => setCountry(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm text-slate-900"
          >
            <option value="">All countries</option>
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <button
            onClick={() => exportToCSV(filtered)}
            className="ml-auto bg-amber-500 hover:bg-amber-600 text-slate-900 text-sm font-semibold px-4 py-2 rounded-md transition"
          >
            Export CSV
          </button>
        </div>

        {/* Table */}
        <table className="w-full text-sm text-slate-900">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Country</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr
                key={r.id}
                onClick={() => setSelected(r)}
                className={`cursor-pointer hover:bg-gray-50 ${
                  selected?.id === r.id ? "bg-gray-200" : ""
                }`}
              >
                <td className="p-3">{r.full_name}</td>
                <td className="p-3">{r.email}</td>
                <td className="p-3">{r.country || "—"}</td>
                <td className="p-3">
                  {new Date(r.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No registrations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* ================= DETAILS ================= */}
      <aside className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold mb-4">Registration details</h2>

        {!selected ? (
          <p className="text-gray-500 text-sm">
            Select a registration to view details
          </p>
        ) : (
          <div className="space-y-3 text-sm">
            <Detail label="Full name" value={selected.full_name} />
            <Detail label="Email" value={selected.email} />
            <Detail label="Phone" value={selected.phone || "—"} />
            <Detail label="Organization" value={selected.organization || "—"} />
            <Detail label="Role" value={selected.role || "—"} />
            <Detail label="Sector" value={selected.sector || "—"} />
            <Detail label="Country" value={selected.country || "—"} />
            <Detail
              label="Submitted"
              value={new Date(selected.created_at).toLocaleString()}
            />
          </div>
        )}
      </aside>
    </div>
  )
}

/* ================= DETAIL ITEM ================= */
function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="font-medium text-slate-900">
        {value}
      </p>
    </div>
  )
}
