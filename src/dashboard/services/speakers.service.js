import { supabase } from "../../lib/supabase";

/* ================= SPEAKERS CRUD ================= */

export async function fetchSpeakers() {
  return await supabase
    .from("speakers")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function createSpeaker(payload) {
  return await supabase
    .from("speakers")
    .insert([payload])
    .select()
    .single();
}

export async function updateSpeaker(id, payload) {
  return await supabase
    .from("speakers")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
}

export async function deleteSpeaker(id) {
  return await supabase
    .from("speakers")
    .delete()
    .eq("id", id);
}

/* ================= PHOTO UPLOAD (FIXED) ================= */

export async function uploadSpeakerPhoto(file) {
  if (!file) throw new Error("No file selected");

  // Validate type
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  // Validate size (2MB)
  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Image must be less than 2MB");
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `speaker_${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("speakers")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (error) {
    console.error("Upload error:", error);
    throw error;
  }

  const { data } = supabase.storage
    .from("speakers")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
