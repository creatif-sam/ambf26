import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

import {
  fetchConferenceStats,
  fetchConferenceDaily,
  fetchConferenceMonthly
} from "../services/registrations.service"

import {
  getMembershipCount,
  getMembershipDaily,
  getMembershipMonthly
} from "../services/analytics.service"

export default function DashboardOverview() {
  const [conferenceCount, setConferenceCount] = useState(0)
  const [membershipCount, setMembershipCount] = useState(0)

  const [confDaily, setConfDaily] = useState([])
  const [confMonthly, setConfMonthly] = useState([])
  const [memberDaily, setMemberDaily] = useState([])
  const [memberMonthly, setMemberMonthly] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const [
      confCount,
      memberCount,
      confDay,
      confMonth,
      memberDay,
      memberMonth
    ] = await Promise.all([
      fetchConferenceStats(),
      getMembershipCount(),
      fetchConferenceDaily(),
      fetchConferenceMonthly(),
      getMembershipDaily(),
      getMembershipMonthly()
    ])

    setConferenceCount(confCount)
    setMembershipCount(memberCount)
    setConfDaily(confDay || [])
    setConfMonthly(confMonth || [])
    setMemberDaily(memberDay || [])
    setMemberMonthly(memberMonth || [])
  }

  return (
    <div className="space-y-8">

      {/* Top statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Conference Registrations" value={conferenceCount} />
        <StatCard title="Club Membership Applications" value={membershipCount} />
        <StatCard title="Payments Received" value="—" muted />
        <StatCard title="Pending Payments" value="—" muted />
      </div>

      {/* Conference charts */}
      <Section title="Conference Registrations Trend">
        <ChartBlock title="Daily Growth">
          <LineGraph data={confDaily} />
        </ChartBlock>

        <ChartBlock title="Monthly Growth">
          <LineGraph data={confMonthly} />
        </ChartBlock>
      </Section>

      {/* Membership charts */}
      <Section title="Club Membership Applications Trend">
        <ChartBlock title="Daily Growth">
          <LineGraph data={memberDaily} />
        </ChartBlock>

        <ChartBlock title="Monthly Growth">
          <LineGraph data={memberMonthly} />
        </ChartBlock>
      </Section>

    </div>
  )
}

/* ---------------- Components ---------------- */

function StatCard({ title, value, muted }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p
        className={`text-3xl font-bold mt-2 ${
          muted ? "text-gray-400" : "text-slate-900"
        }`}
      >
        {value ?? "—"}
      </p>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  )
}

function ChartBlock({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-black mb-3">
        {title}
      </h3>
      {children}
    </div>
  )
}

function LineGraph({ data }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
