import { supabase } from "../../lib/supabase";

export async function fetchConferenceRegistrations() {
  return supabase
    .from("conference_registrations")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function fetchConferenceStats() {
  const { count } = await supabase
    .from("conference_registrations")
    .select("*", { count: "exact", head: true });

  return count;
}
