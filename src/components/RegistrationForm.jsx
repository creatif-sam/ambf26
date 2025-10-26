// src/components/RegistrationForm.jsx
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function RegistrationForm() {
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
          <p className="text-slate-300">We'll send confirmation details to your email.</p>
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
              placeholder="Club/Organization"
              value={formData.company}
              onChange={handleChange}
              className="bg-slate-900/80 border border-amber-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="position"
              placeholder="Role/Title"
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
              <option value="governance">Sports Governance & Federations</option>
              <option value="clubs">Clubs & Leagues</option>
              <option value="performance">High Performance & Coaching</option>
              <option value="tech">Sports Tech & Data</option>
              <option value="media">Broadcast & Media</option>
              <option value="marketing">Sponsorship & Marketing</option>
              <option value="infrastructure">Facilities & Infrastructure</option>
              <option value="esports">Esports & Gaming</option>
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
