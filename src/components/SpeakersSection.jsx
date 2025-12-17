import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

/*
  PUBLIC SPEAKERS SECTION
  -----------------------
  - Fetches confirmed speakers from Supabase
  - Displays speaker photo, name, role, organization, topic
  - Responsive grid
*/

export default function SpeakersSection() {
  const [speakers, setSpeakers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSpeakers()
  }, [])

  async function loadSpeakers() {
    const { data, error } = await supabase
      .from("speakers")
      .select(`
        id,
        full_name,
        organization,
        speaking_topic,
        speaking_type,
        photo_url
      `)
      .eq("status", "confirmed")
      .order("created_at", { ascending: false })

    if (!error) {
      setSpeakers(data || [])
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <section className="py-20 text-center text-slate-300">
        Loading speakers...
      </section>
    )
  }

  if (!speakers.length) {
    return null
  }

  return (
    <section id="speakers" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Featured Speakers
        </h2>

        <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
          Meet the leaders, innovators, and decision makers shaping the future of
          Africa’s sports economy.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map(s => (
            <SpeakerCard key={s.id} speaker={s} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- CARD ---------------- */

function SpeakerCard({ speaker }) {
  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-2xl p-6 text-center shadow-lg hover:scale-[1.02] transition">
      <div className="mb-4">
        {speaker.photo_url ? (
          <img
            src={speaker.photo_url}
            alt={speaker.full_name}
            className="h-28 w-28 mx-auto rounded-full object-cover border-2 border-amber-400"
          />
        ) : (
          <div className="h-28 w-28 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-3xl">
            {speaker.full_name.charAt(0)}
          </div>
        )}
      </div>

      <h3 className="text-xl font-semibold">
        {speaker.full_name}
      </h3>

      {speaker.organization && (
        <p className="text-amber-400 text-sm mt-1">
          {speaker.organization}
        </p>
      )}

      {speaker.speaking_type && (
        <p className="text-slate-300 text-sm mt-2">
          {speaker.speaking_type}
        </p>
      )}

      {speaker.speaking_topic && (
        <p className="text-slate-400 text-sm mt-3">
          “{speaker.speaking_topic}”
        </p>
      )}
    </div>
  )
}
