import { useState } from "react"

/*
  PAYMENT VALIDATIONS PAGE

  This is a UI-only page.
  No database.
  No Payzone integration.
  No API calls.

  PURPOSE:
  - Display payments
  - Filter payments
  - Review a payment
  - Prepare hooks for Payzone + Supabase later
*/

export default function PaymentValidations() {
  // Placeholder state
  const [payments] = useState([])
  const [selected, setSelected] = useState(null)
  const [statusFilter, setStatusFilter] = useState("")
  const [search, setSearch] = useState("")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ================= PAYMENTS LIST ================= */}
      <section className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b flex flex-wrap gap-3 items-center">
          {/* Search by name or email */}
          <input
            placeholder="Search payer name or email"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm w-full md:w-64 text-slate-900"
          />

          {/* Filter by payment status */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm text-slate-900"
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="success">Successful</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          {/* Export button placeholder */}
          <button
            disabled
            className="ml-auto bg-amber-500/60 text-slate-900 text-sm font-semibold px-4 py-2 rounded-md cursor-not-allowed"
            title="CSV export will be added later"
          >
            Export CSV
          </button>
        </div>

        {/* Payments table */}
        <table className="w-full text-sm text-slate-900">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Payer</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder empty state */}
            <tr>
              <td colSpan={5} className="p-6 text-center text-gray-500">
                Payments will appear here once Payzone is connected
              </td>
            </tr>

            {/* Example row (to be replaced later)
            <tr
              onClick={() => setSelected(payment)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="p-3">John Doe</td>
              <td className="p-3">MAD 1,500</td>
              <td className="p-3">Card</td>
              <td className="p-3">
                <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </td>
              <td className="p-3">2026-01-10</td>
            </tr>
            */}
          </tbody>
        </table>
      </section>

      {/* ================= PAYMENT DETAILS ================= */}
      <aside className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold mb-4">Payment details</h2>

        {!selected ? (
          <p className="text-gray-500 text-sm">
            Select a payment to review details
          </p>
        ) : (
          <div className="space-y-3 text-sm">
            {/* All fields below will be populated from Payzone later */}

            <Detail label="Payer name" value="—" />
            <Detail label="Email" value="—" />
            <Detail label="Amount" value="—" />
            <Detail label="Currency" value="—" />
            <Detail label="Payment method" value="—" />
            <Detail label="Provider reference" value="—" />
            <Detail label="Status" value="—" />
            <Detail label="Submitted" value="—" />

            {/* Admin actions */}
            <div className="pt-4 flex gap-3">
              <button
                disabled
                className="flex-1 bg-green-600/60 text-white py-2 rounded-md cursor-not-allowed"
                title="Will manually validate payment later"
              >
                Mark as Paid
              </button>

              <button
                disabled
                className="flex-1 bg-red-600/60 text-white py-2 rounded-md cursor-not-allowed"
                title="Will reject or refund payment later"
              >
                Reject
              </button>
            </div>
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
