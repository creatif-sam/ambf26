import React, { useState } from "react";
import { Calendar, MapPin, Clock, CheckCircle } from "lucide-react";
import "./index.css";

// If your file is at src/App.jsx and components live in src/components:
import Navbar from "./components/Navbar";
import Hero from "./components/Hero"; // was "Hero"

function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    sector: "",
    country: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gradient-to-br from-amber-600/10 to-slate-900/50 p-8 rounded-xl border border-amber-500/30">
      {submitted ? (
        <div className="text-center py-8">
          <CheckCircle className="mx-auto text-amber-400 mb-4" size={48} />
          <h3 className="text-2xl font-bold mb-2">Registration Received!</h3>
          <p className="text-slate-300">
            We'll send confirmation details to your email.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="bg-slate-900/80 border border-amber-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-900/80 border border-amber-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              required
              value={formData.phone}
              onChange={handleChange}
              className="bg-slate-900/80 border border-amber-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
            <input
              type="text"
              name="company"
              placeholder="Company/Organization"
              value={formData.company}
              onChange={handleChange}
              className="bg-slate-900/80 border border-amber-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="position"
              placeholder="Position/Title"
              value={formData.position}
              onChange={handleChange}
              className="bg-slate-900/80 border border-amber-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
            <select
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className="bg-slate-900/80 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400"
            >
              <option value="">Select Sector</option>
              <option value="healthcare">Healthcare & Medical</option>
              <option value="pharma">Pharmaceuticals</option>
              <option value="medtech">Medical Technology</option>
              <option value="biotech">Biotechnology</option>
              <option value="investment">Investment & Finance</option>
              <option value="other">Other</option>
            </select>
          </div>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full bg-slate-900/80 border border-amber-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 rounded-lg transition transform hover:scale-105"
          >
            Complete Registration
          </button>
        </form>
      )}
    </div>
  );
}

function Partners() {
  return (
    <section className="py-20 px-4 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center">Our Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-32 h-32 bg-gradient-to-br from-amber-500/10 to-slate-700/30 rounded-lg border border-amber-500/20 flex items-center justify-center"
            >
              <span className="text-slate-500 text-sm">Partner {i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-4 bg-slate-900 border-t border-amber-500/20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-slate-900">
            A
          </div>
          <span className="text-xl font-bold">AfricaMed Forum</span>
        </div>
        <p className="text-slate-400 mb-6">
          Advancing Healthcare Innovation and Investment Across Africa
        </p>
        <p className="text-sm text-slate-500">
          © 2026 AfricaMed Business Forum. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function AfricaMedForumWebsite() {
  // Props for Navbar/Header
  const eventStartISO = "2026-01-16T08:30:00+01:00";
  const eventEndISO = "2026-01-16T18:00:00+01:00";
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "program", label: "Program" },
    { id: "register", label: "Register" },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 text-white">
      {/* Top */}
      <Navbar
        sections={sections}
        eventStartISO={eventStartISO}
        eventEndISO={eventEndISO}
        onNav={scrollTo}
      />
      <Hero
        eventStartISO={eventStartISO}
        eventEndISO={eventEndISO}
        onPrimary={() => scrollTo("register")}
        onSecondary={() => scrollTo("about")}
      />

      {/* Event Details */}
      <section
        aria-labelledby="details"
        className="py-16 px-4 bg-slate-800/50 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          <h2 id="details" className="sr-only">
            Event details
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-amber-600/20 to-slate-900/50 p-8 rounded-xl border border-amber-500/20 hover:border-amber-400/50 transition">
              <Calendar className="text-amber-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Event Date</h3>
              <p className="text-slate-300">January 16, 2026</p>
              <p className="text-sm text-slate-400 mt-2">One Day of Innovation</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-600/20 to-slate-900/50 p-8 rounded-xl border border-yellow-500/20 hover:border-yellow-400/50 transition">
              <Clock className="text-amber-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Schedule</h3>
              <p className="text-slate-300">08:30 to 18:00</p>
              <p className="text-sm text-slate-400 mt-2">Africa Casablanca</p>
            </div>

            <div className="bg-gradient-to-br from-amber-600/20 to-slate-900/50 p-8 rounded-xl border border-amber-500/20 hover:border-amber-400/50 transition">
              <MapPin className="text-amber-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-slate-300">Palais des Congres</p>
              <p className="text-sm text-slate-400 mt-2">
                Bouregreg, Rabat, Morocco
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About / Focus Areas */}
      <main id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Key Focus Areas</h2>
          <p className="text-center text-slate-300 mb-12 text-lg">
            Driving healthcare transformation across Africa
          </p>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { icon: "🏥", title: "Healthcare Systems", desc: "Infrastructure & delivery" },
              { icon: "💊", title: "Pharmaceuticals", desc: "Drug development & access" },
              { icon: "🔬", title: "Medical Technology", desc: "Innovation & devices" },
              { icon: "🧬", title: "Biotechnology", desc: "Research & development" },
              { icon: "💰", title: "Investment", desc: "Funding & partnerships" },
            ].map((area, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-amber-600/10 to-yellow-600/10 p-6 rounded-xl border border-amber-500/20 hover:border-amber-400/50 transition transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4" aria-hidden>
                  {area.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{area.title}</h3>
                <p className="text-sm text-slate-300">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Program Highlights */}
      <section
        id="program"
        className="py-20 px-4 bg-gradient-to-r from-slate-800/50 to-amber-900/50"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-center">
            Program Highlights
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                day: "Morning Session",
                items: [
                  "Opening Ceremony & Keynotes",
                  "Panel: Healthcare Innovation in Africa",
                  "Investment Opportunities Showcase",
                ],
              },
              {
                day: "Afternoon Session",
                items: [
                  "Sector Roundtables (Pharma, MedTech, BioTech)",
                  "B2B Matchmaking",
                  "Innovation Showcase",
                ],
              },
              {
                day: "Evening Session",
                items: [
                  "Startup Pitch Competition",
                  "Partnership Announcements",
                  "Networking Reception",
                ],
              },
            ].map((d, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-amber-500/30 bg-slate-900/50"
              >
                <h3 className="font-semibold text-amber-300 mb-4">{d.day}</h3>
                <ul className="space-y-2 text-slate-300">
                  {d.items.map((it, k) => (
                    <li key={k} className="flex items-start gap-2">
                      <CheckCircle size={16} className="mt-1 text-amber-300" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "300+", label: "Expected Attendees" },
              { stat: "20+", label: "Expert Speakers" },
              { stat: "50+", label: "Companies" },
              { stat: "15+", label: "Countries" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-4xl font-bold text-amber-400 mb-2">
                  {item.stat}
                </div>
                <p className="text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Register */}
      <section id="register" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Register Today</h2>
          <p className="text-center text-slate-300 mb-12">
            Join healthcare leaders, investors, and innovators from across Africa
          </p>
          <RegistrationForm />
        </div>
      </section>

      <Partners />
      <Footer />
    </div>
  );
}
