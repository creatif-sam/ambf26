import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { ArrowUp, ArrowDown, Pencil, Trash2 } from "lucide-react";


import {
  fetchSpeakers,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
  uploadSpeakerPhoto,
  deleteSpeakerPhoto
} from "../services/speakers.service"

/*
  SPEAKERS ADMIN PAGE
  ------------------
  Features:
  - List speakers
  - Count total speakers
  - Add speaker (modal)
  - Edit speaker (modal)
  - Change status (draft / confirmed)
  - Upload speaker photo
  - Delete speaker + cleanup photo
*/

const EMPTY_FORM = {
  full_name: "",
  organization: "",
  speaking_topic: "",
  speaking_type: "Keynote",
  status: "draft",
  bio: "",
  photo_url: ""
}

export default function Speakers() {
  const [speakers, setSpeakers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState(EMPTY_FORM)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState("")

  /* ================= LOAD ================= */
  useEffect(() => {
    loadSpeakers()
  }, [])

  async function loadSpeakers() {
    const { data } = await fetchSpeakers()
    setSpeakers(data || [])
  }

//Move speaker up or down in the list
  async function moveSpeaker(speaker, direction) {
  const newOrder =
    direction === "up"
      ? speaker.display_order - 1
      : speaker.display_order + 1;

  await updateSpeaker(speaker.id, {
    display_order: newOrder
  });

  loadSpeakers();
}



  /* ================= MODAL ================= */
  function openAdd() {
    setEditing(null)
    setForm(EMPTY_FORM)
    setPhotoFile(null)
    setPhotoPreview("")
    setShowModal(true)
  }

  function openEdit(speaker) {
    setEditing(speaker)
    setForm({ ...speaker })
    setPhotoPreview(speaker.photo_url || "")
    setPhotoFile(null)
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setEditing(null)
    setForm(EMPTY_FORM)
    setPhotoFile(null)
    setPhotoPreview("")
  }

  /* ================= FORM ================= */
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (loading) return

    setLoading(true)

    let photoUrl = form.photo_url

    // Upload new photo if selected
    if (photoFile) {
      try {
        photoUrl = await uploadSpeakerPhoto(photoFile)
      } catch (err) {
        toast.error(err.message || "Photo upload failed")
        setLoading(false)
        return
      }
    }

    const payload = { ...form, photo_url: photoUrl }

    const action = editing
      ? updateSpeaker(editing.id, payload)
      : createSpeaker(payload)

    const { error } = await action

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }

    toast.success(editing ? "Speaker updated" : "Speaker added")
    closeModal()
    loadSpeakers()
    setLoading(false)
  }

  /* ================= DELETE ================= */
  async function handleDelete(speaker) {
    const ok = window.confirm("Delete this speaker permanently?")
    if (!ok) return

    // Cleanup photo from storage
    if (speaker.photo_url) {
      try {
        await deleteSpeakerPhoto(speaker.photo_url)
      } catch (err) {
        console.warn("Photo cleanup failed", err)
      }
    }

    const { error } = await deleteSpeaker(speaker.id)
    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Speaker deleted")
    loadSpeakers()
  }

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-slate-900">
          Speakers ({speakers.length})
        </h1>

        <button
          onClick={openAdd}
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-4 py-2 rounded-md"
        >
          Add Speaker
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-slate-900">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Photo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {speakers.map(s => (
              <tr key={s.id} className="border-t">
                <td className="p-3">
                  {s.photo_url ? (
                    <img
                      src={s.photo_url}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    "—"
                  )}
                </td>

                <td className="p-3">{s.full_name}</td>
                <td className="p-3">{s.speaking_type}</td>

                <td className="p-3 capitalize">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      s.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>

<td className="p-3">
  <div className="flex justify-end items-center gap-2">
    <button
      onClick={() => moveSpeaker(s, "up")}
      className="text-gray-600"
    >
      <ArrowUp size={16} />
    </button>

    <button
      onClick={() => moveSpeaker(s, "down")}
      className="text-gray-600"
    >
      <ArrowDown size={16} />
    </button>

    <button
      onClick={() => openEdit(s)}
      className="text-amber-600"
    >
      <Pencil size={16} />
    </button>

    <button
      onClick={() => handleDelete(s)}
      className="text-red-600"
    >
      <Trash2 size={16} />
    </button>
  </div>
</td>



              </tr>
            ))}

            {speakers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No speakers added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4 text-slate-900">
              {editing ? "Edit Speaker" : "Add Speaker"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Full name"
                required
                className="w-full border rounded-md px-3 py-2 text-slate-900"
              />

              <input
                name="organization"
                value={form.organization || ""}
                onChange={handleChange}
                placeholder="Organization"
                className="w-full border rounded-md px-3 py-2 text-slate-900"
              />

              <input
                name="speaking_topic"
                value={form.speaking_topic || ""}
                onChange={handleChange}
                placeholder="Speaking topic"
                className="w-full border rounded-md px-3 py-2 text-slate-900"
              />

              <select
                name="speaking_type"
                value={form.speaking_type}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-slate-900"
              >
                <option value="Keynote">Keynote</option>
                <option value="Panelist">Panelist</option>
                <option value="Moderator">Moderator</option>
                <option value="Workshop">Workshop</option>
              </select>

              {/* ✅ STATUS SELECT */}
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-slate-900"
              >
                <option value="draft">Draft (hidden)</option>
                <option value="confirmed">Confirmed (public)</option>
              </select>

              <textarea
                name="bio"
                value={form.bio || ""}
                onChange={handleChange}
                placeholder="Bio"
                rows={3}
                className="w-full border rounded-md px-3 py-2 text-slate-900"
              />

              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  setPhotoFile(e.target.files[0])
                  setPhotoPreview(URL.createObjectURL(e.target.files[0]))
                }}
              />

              {photoPreview && (
                <img
                  src={photoPreview}
                  alt=""
                  className="h-24 w-24 rounded-full object-cover"
                />
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md bg-black text-white border border-black hover:bg-slate-800 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
