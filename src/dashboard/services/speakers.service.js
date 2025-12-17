import { supabase } from "../../lib/supabase";

/*
  SPEAKERS SERVICE
  ----------------
  Centralized Supabase logic for speakers
  Includes CRUD + photo upload + photo cleanup
*/

/* ===== Fetch all speakers ===== */
export async function fetchSpeakers() {
  return await supabase
    .from("speakers")
    .select("*")
    .order("created_at", { ascending: false });
}

/* ===== Create speaker ===== */
export async function createSpeaker(payload) {
  return await supabase
    .from("speakers")
    .insert([payload])
    .select()
    .single();
}

/* ===== Update speaker ===== */
export async function updateSpeaker(id, payload) {
  return await supabase
    .from("speakers")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
}

/* ===== Delete speaker ===== */
export async function deleteSpeaker(id) {
  return await supabase
    .from("speakers")
    .delete()
    .eq("id", id);
}

/* ===== Upload speaker photo ===== */
export async function uploadSpeakerPhoto(file) {
  if (!file) throw new Error("No file selected");

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Image must be less than 2MB");
  }

  const ext = file.name.split(".").pop();
  const fileName = `speaker_${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("speakers")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("speakers")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

/* ===== Delete speaker photo ===== */
export async function deleteSpeakerPhoto(photoUrl) {
  if (!photoUrl) return;

  const path = photoUrl.split("/").pop();

  await supabase.storage
    .from("speakers")
    .remove([path]);
}
