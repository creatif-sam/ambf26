import React, { useState } from "react";

// AfricaMed Club Page React component
// Defaults for gold and black are provided but can be overridden via props

export default function AfricaMedClubPage({ gold = "#D4AF37", black = "#000000" }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    organization: "",
    role: "",
    reason: "",
    agree: false,
  });

  const [status, setStatus] = useState({ submitted: false, error: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Please enter your full name";
    if (!form.email.trim()) return "Please enter an email address";
    if (!form.country.trim()) return "Please enter your country";
    if (!form.agree) return "You must agree to the membership guidelines";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ submitted: false, error: err });
      return;
    }

    // For integration: replace this with your API endpoint or submission handler
    // Example: fetch('/api/club-join', { method: 'POST', body: JSON.stringify(form) })

    // Immediate UI feedback only. Do not perform background scheduling.
    setStatus({ submitted: true, error: "" });
  };

  return (
    <div
      className="min-h-screen py-12 px-6 md:px-12 bg-white text-gray-900"
      style={{
        // expose color variables for Tailwind utility fallback if you want to use them inline
        ["--am-gold"]: gold,
        ["--am-black"]: black,
      }}
    >
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow"
              style={{ backgroundColor: "var(--am-black)" }}
            >
              <span className="text-white font-semibold">AM</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">AfricaMed Club</h1>
              <p className="text-sm text-gray-600">Africa Mediterranean Business Forum Club</p>
            </div>
          </div>
          <a
            href="#join"
            className="inline-block px-4 py-2 rounded-md font-medium"
            style={{ backgroundColor: "var(--am-gold)", color: "var(--am-black)" }}
          >
            Join the Club
          </a>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <section>
            <div className="rounded-2xl p-8 shadow-md">
              <h2 className="text-xl font-semibold mb-3">About the Club</h2>
              <p className="text-gray-700 mb-4">
                The AfricaMed Club is the membership arm of the Africa Mediterranean Business Forum. The club
                connects business leaders, entrepreneurs, policy makers, investors, and professionals across the
                Africa Mediterranean corridor to share knowledge, form partnerships, and drive sustainable economic
                development.
              </p>

              <h3 className="font-semibold">Who should join</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Business leaders and executives</li>
                <li>Entrepreneurs and startups</li>
                <li>Investors and financiers</li>
                <li>Policy makers and public sector representatives</li>
                <li>Professional service providers and consultants</li>
              </ul>

              <h3 className="font-semibold">Member benefits</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Priority invites to AfricaMed events and roundtables</li>
                <li>Networking opportunities across the Mediterranean and Africa</li>
                <li>Access to exclusive briefings, research, and member directories</li>
                <li>Partnership and sponsorship pathways</li>
              </ul>
            </div>
          </section>

          <aside id="join">
            <div className="rounded-2xl p-8 shadow-md">
              <h2 className="text-xl font-semibold mb-3">Join AfricaMed Club</h2>

              {status.submitted ? (
                <div className="p-4 rounded-md bg-green-50 text-green-800">
                  Thank you for joining the AfricaMed Club. A representative will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status.error && <div className="text-red-600">{status.error}</div>}

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
                    <label className="block text-sm font-medium">Why do you want to join?</label>
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
                      I agree to the membership guidelines and to be contacted by AfricaMed Club
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md font-semibold"
                      style={{ backgroundColor: "var(--am-gold)", color: "var(--am-black)" }}
                    >
                      Submit
                    </button>

                    <button
                      type="button"
                      className="px-4 py-2 rounded-md border"
                      onClick={() => setForm({ fullName: "", email: "", phone: "", country: "", organization: "", role: "", reason: "", agree: false })}
                    >
                      Reset
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-6 text-xs text-gray-500">
                By submitting you consent to be contacted by AfricaMed Club for membership matters.
              </div>
            </div>
          </aside>
        </main>

        <footer className="mt-10 text-center text-sm text-gray-600">
          Need this styled differently or connected to a backend? Update the form action in the component
          accordingly
        </footer>
      </div>
    </div>
  );
}
