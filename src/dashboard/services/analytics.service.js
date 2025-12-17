import { supabase } from "../../lib/supabase"

/*
  MEMBERSHIP ANALYTICS SERVICE

  Table used
  africamed_club_applications
*/

/* Total membership applications */
export async function getMembershipCount() {
  const { count, error } = await supabase
    .from("africamed_club_applications")
    .select("*", { count: "exact", head: true })

  if (error) {
    console.error("Membership count error:", error)
    return 0
  }

  return count || 0
}

/* Daily membership applications */
export async function getMembershipDaily() {
  const { data, error } = await supabase
    .rpc("membership_daily_stats")

  if (error) {
    console.error("Membership daily stats error:", error)
    return []
  }

  return (data || []).map(row => ({
    label: row.day,
    value: Number(row.count)
  }))
}

/* Monthly membership applications */
export async function getMembershipMonthly() {
  const { data, error } = await supabase
    .rpc("membership_monthly_stats")

  if (error) {
    console.error("Membership monthly stats error:", error)
    return []
  }

  return (data || []).map(row => ({
    label: row.month,
    value: Number(row.count)
  }))
}
