import { useEffect, useMemo, useState } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"

export default function AdminDashboard() {
  const [applications, setApplications] = useState([])
  const [selected, setSelected] = useState(null)
  const [adminEmail, setAdminEmail] = useState("")
  const [search, setSearch] = useState("")
  const [countryFilter, setCountryFilter] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setAdminEmail(data?.user?.email || "")
    })
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    const { data } = await supabase
      .from("africamed_club_applications")
      .select("*")
      .order("created_at", { ascending: false })

    setApplications(data || [])
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/admin-login")
  }

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.full_name.toLowerCase().includes(search.toLowerCase()) ||
        app.email.toLowerCase().includes(search.toLowerCase())

      const matchesCountry =
        countryFilter === "" || app.country === countryFilter

      return matchesSearch && matchesCountry
    })
  }, [applications, search, countryFilter])

  const countries = useMemo(() => {
    return [...new Set(applications.map((a) => a.country))].sort()
  }, [applications])

  const exportCSV = () => {
    const headers = [
      "Full Name",
      "Email",
      "Phone",
      "Country",
      "Organization",
      "Role",
      "Motivation",
      "Admin Notes",
      "Submitted At"
    ]

    const rows = filteredApplications.map((a) => [
      a.full_name,
      a.email,
      a.phone || "",
      a.country,
      a.organization || "",
      a.role || "",
      a.reason || "",
      a.admin_notes || "",
      new Date(a.created_at).toISOString()
    ])

    const csv =
      [headers, ...rows]
        .map((row) =>
          row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
        )
        .join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "africamed_club_applications.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const saveNotes = async () => {
    if (!selected) return

    await supabase
      .from("africamed_club_applications")
      .update({ admin_notes: selected.admin_notes })
      .eq("id", selected.id)

    fetchApplications()
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Top bar */}
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">
            AfricaMed Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Membership applications
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {adminEmail}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-slate-900 text-white text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Controls */}
      <div className="px-8 py-4 flex flex-wrap gap-4 items-center bg-white border-b">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm w-64"
        />

        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          onClick={exportCSV}
          className="ml-auto px-4 py-2 rounded-md bg-amber-600 text-white text-sm font-semibold"
        >
          Export Excel
        </button>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-8">
        {/* List */}
        <section className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm text-slate-900">
            <thead className="bg-gray-100 text-slate-700">
              <tr>
                <th className="text-left p-3 border-b">Name</th>
                <th className="text-left p-3 border-b">Email</th>
                <th className="text-left p-3 border-b">Country</th>
                <th className="text-left p-3 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => setSelected(app)}
                  className={`cursor-pointer hover:bg-gray-50 ${
                    selected?.id === app.id ? "bg-gray-200" : ""
                  }`}
                >
                  <td className="p-3 border-b">{app.full_name}</td>
                  <td className="p-3 border-b">{app.email}</td>
                  <td className="p-3 border-b">{app.country}</td>
                  <td className="p-3 border-b">
                    {new Date(app.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Details */}
        <aside className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold mb-4">
            Application details
          </h2>

          {!selected ? (
            <p className="text-gray-500 text-sm">
              Select an application to view details
            </p>
          ) : (
            <div className="space-y-3 text-sm">
              <Detail label="Full name" value={selected.full_name} />
              <Detail label="Email" value={selected.email} />
              <Detail label="Phone" value={selected.phone || "—"} />
              <Detail label="Country" value={selected.country} />
              <Detail label="Organization" value={selected.organization || "—"} />
              <Detail label="Role or field" value={selected.role || "—"} />
              <Detail label="Motivation" value={selected.reason || "—"} />
              <Detail
                label="Submitted on"
                value={new Date(selected.created_at).toLocaleString()}
              />

              <div className="pt-4">
                <label className="text-xs uppercase tracking-wide text-gray-500">
                  Admin notes
                </label>

                <textarea
                  className="w-full mt-1 border rounded-md p-2 text-sm"
                  rows={4}
                  value={selected.admin_notes || ""}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      admin_notes: e.target.value
                    })
                  }
                />

                <button
                  onClick={saveNotes}
                  className="mt-2 px-4 py-2 bg-slate-900 text-white rounded-md text-sm"
                >
                  Save notes
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

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
