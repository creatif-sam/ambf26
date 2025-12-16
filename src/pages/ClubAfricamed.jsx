import React, { useState } from "react"
  import { supabase } from "../lib/supabase"

export default function AfricaMedClubPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    organization: "",
    role: "",
    reason: "",
    agree: false
  })

  const [status, setStatus] = useState({ submitted: false, error: "" })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }))
  }

  const validate = () => {
    if (!form.fullName.trim()) return "Please enter your full name"
    if (!form.email.trim()) return "Please enter an email address"
    if (!form.country.trim()) return "Please enter your country"
    if (!form.agree) return "You must agree to the membership guidelines"
    return ""
  }



const handleSubmit = async (e) => {
  e.preventDefault()
  const err = validate()
  if (err) {
    setStatus({ submitted: false, error: err })
    return
  }

  const { error } = await supabase
    .from("africamed_club_applications")
    .insert([
      {
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        organization: form.organization,
        role: form.role,
        reason: form.reason
      }
    ])

  if (error) {
    setStatus({
      submitted: false,
      error: "Submission failed. Please try again later."
    })
  } else {
    setStatus({ submitted: true, error: "" })
  }
}


  return (
    <div className="min-h-screen py-14 px-6 md:px-12 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            AfricaMed Club
          </h1>
          <p className="text-gray-600 max-w-3xl">
            The AfricaMed Club is the permanent membership platform of the Africa Mediterranean Business Forum,
            designed to foster long term collaboration between leaders, institutions, and investors across Africa
            and the Mediterranean region.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <section className="rounded-2xl p-8 shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              About the Club
            </h2>

            <p className="text-gray-700 mb-6">
              The AfricaMed Club brings together senior decision makers, entrepreneurs, public sector leaders,
              and professionals committed to advancing investment, innovation, and economic integration across
              the Africa Mediterranean corridor.
            </p>

            <h3 className="font-semibold mb-2">
              Who should join
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Business leaders and corporate executives</li>
              <li>Entrepreneurs and startup founders</li>
              <li>Investors, financiers, and fund managers</li>
              <li>Policy makers and public sector representatives</li>
              <li>Consultants and professional service providers</li>
            </ul>

            <h3 className="font-semibold mb-2">
              Member benefits
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Priority access to AfricaMed Forum events and roundtables</li>
              <li>High value networking across Africa and the Mediterranean</li>
              <li>Access to exclusive insights, briefings, and member resources</li>
              <li>Structured partnership and sponsorship opportunities</li>
            </ul>
          </section>

          <aside id="join" className="rounded-2xl p-8 shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Membership application
            </h2>

            {status.submitted ? (
              <div className="p-4 rounded-md bg-green-50 text-green-800">
                Thank you for your interest in the AfricaMed Club.
                A member of our team will contact you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status.error && (
                  <div className="text-red-600 text-sm">
                    {status.error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium">Full name</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Email address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Country</label>
                    <input
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium">Organization</label>
                  <input
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Role or field</label>
                  <input
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Motivation for joining
                  </label>
                  <textarea
                    name="reason"
                    value={form.reason}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    id="agree"
                    name="agree"
                    type="checkbox"
                    checked={form.agree}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <label htmlFor="agree" className="text-sm">
                    I agree to the membership guidelines and consent to be contacted by the AfricaMed Club
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-md font-semibold bg-slate-900 text-white"
                  >
                    Submit application
                  </button>

                  <button
                    type="button"
                    className="px-5 py-2 rounded-md border"
                    onClick={() =>
                      setForm({
                        fullName: "",
                        email: "",
                        phone: "",
                        country: "",
                        organization: "",
                        role: "",
                        reason: "",
                        agree: false
                      })
                    }
                  >
                    Reset
                  </button>
                </div>
              </form>
            )}

            <p className="mt-6 text-xs text-gray-500">
              By submitting this form, you consent to be contacted regarding AfricaMed Club membership matters.
            </p>
          </aside>
        </main>
      </div>
    </div>
  )
}
