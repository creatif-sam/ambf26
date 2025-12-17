import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";


import {
  fetchSpeakers,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
  uploadSpeakerPhoto
} from "../services/speakers.service";

/*
  SPEAKERS ADMIN
  - Add speaker (modal)
  - Edit speaker (modal)
  - Upload photo
  - Preview photo
  - Delete speaker
*/

const EMPTY_FORM = {
  full_name: "",
  organization: "",
  speaking_topic: "",
  speaking_type: "Keynote",
  status: "draft",
  bio: "",
  photo_url: ""
};

export default function Speakers() {
  const [speakers, setSpeakers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(EMPTY_FORM);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  useEffect(() => {
    loadSpeakers();
  }, []);

  async function loadSpeakers() {
    const { data } = await fetchSpeakers();
    setSpeakers(data || []);
  }

  function openAdd() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setPhotoFile(null);
    setPhotoPreview("");
    setShowModal(true);
  }

  function openEdit(s) {
    setEditing(s);
    setForm(s);
    setPhotoPreview(s.photo_url || "");
    setPhotoFile(null);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    setPhotoFile(null);
    setPhotoPreview("");
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    let photoUrl = form.photo_url;

    if (photoFile) {
  try {
    photoUrl = await uploadSpeakerPhoto(photoFile);
  } catch (err) {
    console.error(err);
    toast.error(err.message || "Photo upload failed");
    setLoading(false);
    return;
  }
}


    const payload = { ...form, photo_url: photoUrl };

    const action = editing
      ? updateSpeaker(editing.id, payload)
      : createSpeaker(payload);

    const { error } = await action;

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success(editing ? "Speaker updated" : "Speaker added");

    closeModal();
    loadSpeakers();
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this speaker permanently?")) return;

    const { error } = await deleteSpeaker(id);
    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Speaker deleted");
    loadSpeakers();
  }

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
                <td className="p-3 capitalize">{s.status}</td>
                <td className="p-3 text-right">
  <div className="inline-flex items-center gap-3">
    {/* Edit */}
    <button
      onClick={() => openEdit(s)}
      title="Edit speaker"
      className="text-amber-600 hover:text-amber-700 transition"
    >
      <Pencil size={18} />
    </button>

    {/* Delete */}
    <button
      onClick={() => handleDelete(s.id)}
      title="Delete speaker"
      className="text-red-600 hover:text-red-700 transition"
    >
      <Trash2 size={18} />
    </button>
  </div>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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
                className="w-full border rounded-md px-3 py-2 text-slate-900"
                required
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
                <option>Keynote</option>
                <option>Panelist</option>
                <option>Moderator</option>
                <option>Workshop</option>
              </select>

              <textarea
                name="bio"
                value={form.bio || ""}
                onChange={handleChange}
                placeholder="Bio"
                rows={3}
                className="w-full border rounded-md px-3 py-2 text-slate-900"
              />

              {/* Photo */}
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  setPhotoFile(e.target.files[0]);
                  setPhotoPreview(URL.createObjectURL(e.target.files[0]));
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
                  className="px-4 py-2 border rounded-md"
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
  );
}
