// src/App.jsx  (renamed from AfricaMedForumWebsite if you like)
import React from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import "./index.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import FocusAreas from "./components/FocusAreas";
import ProgramHighlights from "./components/ProgramHighlights";
import RegistrationForm from "./components/RegistrationForm";
import Partners from "./components/Partners";
import Footer from "./components/Footer";

export default function AfricaSportsForumWebsite() {
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
          <h2 id="details" className="sr-only">Event details</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-amber-600/20 to-slate-900/50 p-8 rounded-xl border border-amber-500/20 hover:border-amber-400/50 transition">
              <Calendar className="text-amber-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Event Date</h3>
              <p className="text-slate-300">January 16, 2026</p>
              <p className="text-sm text-slate-400 mt-2">One Day of Sport & Investment</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-600/20 to-slate-900/50 p-8 rounded-xl border border-yellow-500/20 hover:border-yellow-400/50 transition">
              <Clock className="text-amber-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Schedule</h3>
              <p className="text-slate-300">08:30 to 18:00</p>
              <p className="text-sm text-slate-400 mt-2">Africa Casablanca (UTC+1)</p>
            </div>

            <div className="bg-gradient-to-br from-amber-600/20 to-slate-900/50 p-8 rounded-xl border border-amber-500/20 hover:border-amber-400/50 transition">
              <MapPin className="text-amber-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-slate-300">Palais des Congrès</p>
              <p className="text-sm text-slate-400 mt-2">Bouregreg, Rabat, Morocco</p>
            </div>
          </div>
        </div>
      </section>

      {/* About / Focus Areas */}
      <FocusAreas />

      {/* Program */}
      <ProgramHighlights />

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "300+", label: "Expected Attendees" },
              { stat: "20+", label: "Expert Speakers" },
              { stat: "50+", label: "Organizations" },
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
            Join sports leaders, investors, and innovators from across Africa
          </p>
          <RegistrationForm />
        </div>
      </section>

      <Partners />
      <Footer />
    </div>
  );
}
