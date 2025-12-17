import { supabase } from "../../lib/supabase"

/* ================= FETCH ================= */
export function fetchSpeakers() {
  return supabase
    .from("speakers")
    .select("*")
    .order("created_at", { ascending: false })
}

/* ================= CREATE ================= */
export function createSpeaker(payload) {
  return supabase
    .from("speakers")
    .insert([payload])
}

/* ================= UPDATE (FIXED) ================= */
export function updateSpeaker(id, payload) {
  return supabase
    .from("speakers")
    .update(payload)
    .eq("id", id)
}

/* ================= DELETE ================= */
export function deleteSpeaker(id) {
  return supabase
    .from("speakers")
    .delete()
    .eq("id", id)
}

/* ================= PHOTO UPLOAD ================= */
export async function uploadSpeakerPhoto(file) {
  const fileExt = file.name.split(".").pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`
  const filePath = `speakers/${fileName}`

  const { error } = await supabase.storage
    .from("speakers")
    .upload(filePath, file, { upsert: false })

  if (error) throw error

  const { data } = supabase.storage
    .from("speakers")
    .getPublicUrl(filePath)

  return data.publicUrl
}

/* ================= PHOTO DELETE ================= */
export async function deleteSpeakerPhoto(photoUrl) {
  const path = photoUrl.split("/storage/v1/object/public/speakers/")[1]
  if (!path) return

  await supabase.storage
    .from("speakers")
    .remove([path])
}
