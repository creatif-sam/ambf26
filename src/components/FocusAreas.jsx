// src/components/FocusAreas.jsx
import React from "react";

const AREAS = [
  { icon: "🏟️", title: "Governance & Leagues", desc: "Policy, federations, competitions" },
  { icon: "🎯", title: "Elite Performance", desc: "Science, coaching, talent pathways" },
  { icon: "📊", title: "Sports Tech & Data", desc: "Analytics, wearables, AI tools" },
  { icon: "📺", title: "Media & Broadcast", desc: "Rights, OTT, fan engagement" },
  { icon: "🏗️", title: "Infrastructure", desc: "Stadiums, facilities, operations" },
  { icon: "🧒", title: "Grassroots & Academies", desc: "Community programs, youth systems" },
  { icon: "🎮", title: "Esports & Gaming", desc: "Leagues, creators, monetization" },
  { icon: "💼", title: "Sponsorship & Marketing", desc: "Brands, partnerships, activation" },
  { icon: "💰", title: "Investment & Finance", desc: "Clubs, funds, M&A" },
];

export default function FocusAreas() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Key Focus Areas</h2>
        <p className="text-center text-slate-300 mb-12 text-lg">
          Driving sports transformation across Africa
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {AREAS.map((area, idx) => (
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
    </section>
  );
}
