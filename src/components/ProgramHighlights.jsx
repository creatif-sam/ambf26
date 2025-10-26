// src/components/ProgramHighlights.jsx
import React from "react";
import { CheckCircle } from "lucide-react";

const PROGRAM = [
  {
    block: "Morning Session",
    items: [
      "Opening Ceremony & Keynotes",
      "Panel: Building Sustainable Leagues",
      "Showcase: Sports Tech & Data Startups",
    ],
  },
  {
    block: "Afternoon Session",
    items: [
      "Roundtables (Governance, Media, Performance)",
      "B2B Matchmaking & Rights Trading",
      "Workshop: Facility Finance & Ops",
    ],
  },
  {
    block: "Evening Session",
    items: [
      "Club & Federation Investment Pitches",
      "Partnership Announcements",
      "Networking Reception",
    ],
  },
];

export default function ProgramHighlights() {
  return (
    <section
      id="program"
      className="py-20 px-4 bg-gradient-to-r from-slate-800/50 to-amber-900/50"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center">Program Highlights</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {PROGRAM.map((d, i) => (
            <div key={i} className="p-6 rounded-xl border border-amber-500/30 bg-slate-900/50">
              <h3 className="font-semibold text-amber-300 mb-4">{d.block}</h3>
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
  );
}
