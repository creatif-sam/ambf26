import React from "react";
import "./index.css";
import { Calendar, Clock, MapPin } from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FocusAreas from "./components/FocusAreas";
import ProgramHighlights from "./components/ProgramHighlights";
import Stats from "./components/Stats";
import RegistrationForm from "./components/RegistrationForm";
import Partners from "./components/Partners";
import Footer from "./components/Footer";

export default function AfricaSportsForumWebsite() {
  const eventStartISO = "2026-01-16T08:30:00+01:00";
  const eventEndISO = "2026-01-17T18:00:00+01:00";

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
        forumName="Africamed Business Forum"
      />

      <Hero
        eventStartISO={eventStartISO}
        eventEndISO={eventEndISO}
        onPrimary={() => scrollTo("register")}
        onSecondary={() => scrollTo("about")}
      />

  /* replace your current Event Details section with this */
<section aria-labelledby="details" className="py-16 px-4">
  <div className="max-w-7xl mx-auto">
    <h2 id="details" className="sr-only">Event details</h2>

    <div className="grid md:grid-cols-3 gap-10">
      {/* Card 1 */}
      <div className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-slate-800/60 via-slate-900/40 to-slate-900/80 ring-1 ring-amber-400/35 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute -top-10 -left-10 w-56 h-56 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-amber-400/70 bg-amber-400/10 text-amber-300 mb-6">
          <Calendar size={28} strokeWidth={2.2} />
        </div>
        <h3 className="text-2xl font-extrabold mb-4">Event Dates</h3>
        <p className="text-slate-200 text-lg">16 to 17 January 2026</p>
        <p className="text-slate-400 mt-3">On the sidelines of AFCON 2025</p>
      </div>

      {/* Card 2 */}
      <div className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-slate-800/60 via-slate-900/40 to-slate-900/80 ring-1 ring-amber-400/35 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute -top-10 -left-10 w-56 h-56 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-amber-400/70 bg-amber-400/10 text-amber-300 mb-6">
          <Clock size={28} strokeWidth={2.2} />
        </div>
        <h3 className="text-2xl font-extrabold mb-4">Schedule</h3>
        <p className="text-slate-200 text-lg">08:30 to 18:00 daily</p>
        <p className="text-slate-400 mt-3">Keynotes • Panels • B2B • Showcases</p>
      </div>

      {/* Card 3 */}
      <div className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-slate-800/60 via-slate-900/40 to-slate-900/80 ring-1 ring-amber-400/35 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute -top-10 -left-10 w-56 h-56 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-amber-400/70 bg-amber-400/10 text-amber-300 mb-6">
          <MapPin size={28} strokeWidth={2.2} />
        </div>
        <h3 className="text-2xl font-extrabold mb-4">Location</h3>
        <p className="text-slate-200 text-lg">Casablanca, Morocco</p>
        <p className="text-slate-400 mt-3">Venue details announced soon</p>
      </div>
    </div>
  </div>
</section>


      <FocusAreas />
      <ProgramHighlights />
      <Stats />

      <section id="register" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Register today</h2>
          <p className="text-center text-slate-300 mb-12">
            Join federations, leagues, clubs, investors and innovators shaping Africas sports economy
          </p>
          <RegistrationForm />
        </div>
      </section>

      <Partners />
      <Footer />
    </div>
  );
}
