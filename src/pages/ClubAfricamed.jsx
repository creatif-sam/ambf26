import React, { useState } from "react"
import { supabase, supabaseAnonKey } from "../lib/supabase"

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

  const [status, setStatus] = useState({
    submitted: false
  })

  const [toast, setToast] = useState({
    show: false,
    type: "info",
    message: ""
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((s) => ({
      ...s,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const validate = () => {
    if (!form.fullName.trim()) return "Please enter your full name"
    if (!form.email.trim()) return "Please enter an email address"
    if (!form.country.trim()) return "Please enter your country"
    if (!form.agree) return "You must agree to the membership guidelines"
    return ""
  }

  const showToast = (type, message) => {
    setToast({ show: true, type, message })
    setTimeout(() => {
      setToast((t) => ({ ...t, show: false }))
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationError = validate()
    if (validationError) {
      showToast("error", validationError)
      return
    }

    try {
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
        if (error.code === "23505") {
          showToast(
            "warning",
            "This email is already registered. Our team will contact you if needed."
          )
          return
        }

        showToast(
          "error",
          "Unable to submit your application. Please try again later."
        )
        return
      }

      setStatus({ submitted: true })
      showToast("success", "Application submitted successfully.")

      fetch(
        "https://devjqoacvmqzgwoxoddo.supabase.co/functions/v1/send-application-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${supabaseAnonKey}`
          },
          body: JSON.stringify({
            full_name: form.fullName,
            email: form.email,
            country: form.country
          })
        }
      ).catch(() => {
        console.warn("Email notification failed")
      })
    } catch {
      showToast(
        "error",
        "Unexpected error occurred. Please try again."
      )
    }
  }

  return (
    <div className="min-h-screen py-14 px-6 md:px-12 bg-white text-gray-900 relative">
      {toast.show && (
        <div className="fixed top-24 right-6 z-50">
          <div
            className={`px-5 py-4 rounded-lg shadow-lg text-sm font-medium max-w-sm
              ${toast.type === "success" && "bg-green-600 text-white"}
              ${toast.type === "warning" && "bg-amber-500 text-white"}
              ${toast.type === "error" && "bg-red-600 text-white"}
            `}
          >
            {toast.message}
            <button
              className="ml-4 text-white/80 hover:text-white"
              onClick={() => setToast((t) => ({ ...t, show: false }))}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            AfricaMed Club
          </h1>
          <p className="text-gray-600 max-w-3xl">
            The AfricaMed Club is the permanent membership platform of the Africa
            Mediterranean Business Forum, designed to foster long term collaboration
            between leaders, institutions, and investors across Africa and the
            Mediterranean region.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <section className="rounded-2xl p-8 shadow-md">
            <h2 className="text-xl font-semibold mb-4">About the Club</h2>
            <p className="text-gray-700 mb-6">
              The AfricaMed Club brings together senior decision makers,
              entrepreneurs, public sector leaders, and professionals committed
              to advancing investment, innovation, and economic integration
              across the Africa Mediterranean corridor.
            </p>

            <h3 className="font-semibold mb-2">Who should join</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Business leaders and corporate executives</li>
              <li>Entrepreneurs and startup founders</li>
              <li>Investors, financiers, and fund managers</li>
              <li>Policy makers and public sector representatives</li>
              <li>Consultants and professional service providers</li>
            </ul>

            <h3 className="font-semibold mb-2">Member benefits</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Priority access to AfricaMed Forum events and roundtables</li>
              <li>High value networking across Africa and the Mediterranean</li>
              <li>Access to exclusive insights and member resources</li>
              <li>Structured partnership and sponsorship opportunities</li>
            </ul>
          </section>

          <aside className="rounded-2xl p-8 shadow-md">
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
                <input
                  name="fullName"
                  placeholder="Full name"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2"
                  />
                  <input
                    name="country"
                    placeholder="Country"
                    value={form.country}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2"
                  />
                </div>

                <input
                  name="organization"
                  placeholder="Organization"
                  value={form.organization}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                />

                <input
                  name="role"
                  placeholder="Role or field"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                />

                <textarea
                  name="reason"
                  placeholder="Motivation"
                  rows={3}
                  value={form.reason}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                />

                <label className="flex gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                  />
                  I agree to the membership guidelines
                </label>

                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white py-2 rounded-md font-semibold"
                >
                  Submit application
                </button>
              </form>
            )}
          </aside>
        </main>
      </div>
    </div>
  )
}
