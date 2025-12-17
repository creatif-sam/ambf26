import { supabase } from "../../lib/supabase"

/*
  CONFERENCE REGISTRATIONS SERVICE

  Responsibilities
  - Fetch full registration list (admin table)
  - Fetch total registrations count
  - Fetch daily aggregation
  - Fetch monthly aggregation
*/

/* ===============================
   Full conference registrations
   Used by ConferenceRegistrations.jsx
================================ */
export async function fetchConferenceRegistrations() {
  const { data, error } = await supabase
    .from("conference_registrations")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Fetch conference registrations error:", error)
    return { data: [] }
  }

  return { data }
}

/* ===============================
   Total conference registrations
   Used by DashboardOverview.jsx
================================ */
export async function fetchConferenceStats() {
  const { count, error } = await supabase
    .from("conference_registrations")
    .select("*", { count: "exact", head: true })

  if (error) {
    console.error("Conference count error:", error)
    return 0
  }

  return count || 0
}

/* ===============================
   Daily conference registrations
================================ */
export async function fetchConferenceDaily() {
  const { data, error } = await supabase
    .rpc("conference_daily_stats")

  if (error) {
    console.error("Conference daily stats error:", error)
    return []
  }

  return (data || []).map(row => ({
    label: row.day,
    value: Number(row.count)
  }))
}

/* ===============================
   Monthly conference registrations
================================ */
export async function fetchConferenceMonthly() {
  const { data, error } = await supabase
    .rpc("conference_monthly_stats")

  if (error) {
    console.error("Conference monthly stats error:", error)
    return []
  }

  return (data || []).map(row => ({
    label: row.month,
    value: Number(row.count)
  }))
}
