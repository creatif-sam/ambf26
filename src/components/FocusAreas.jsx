import React from "react";

export default function FocusAreas({
  title = "Key Focus Areas",
  subtitle = "The African Sports Industry — Beyond the Game, Build the Economy",
  areas = [
    { icon: "🏟️", title: "Leagues & Clubs", desc: "Commercialization & governance" },
    { icon: "📺", title: "Media & Rights", desc: "Broadcast, OTT & content" },
    { icon: "💼", title: "Sponsorship", desc: "Brands, partnerships & ROI" },
    { icon: "🧠", title: "SportsTech & Data", desc: "AI, analytics & fantech" },
    { icon: "🏥", title: "Performance & Health", desc: "Sports medicine & talent" },
  ],
  className = "",
}) {
  return (
    <section
      id="about"
      className={`py-20 px-4 bg-gradient-to-b from-slate-900 via-amber-900/10 to-slate-900 text-white ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-3 text-center">{title}</h2>
        <p className="text-center text-slate-300 mb-14 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
          {areas.map((area, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-amber-700/10 to-slate-900/30 border border-amber-500/30 rounded-2xl p-8 w-full h-64 hover:border-amber-400/60 transition transform hover:-translate-y-2"
            >
              <div className="text-5xl mb-5" aria-hidden>{area.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-white">{area.title}</h3>
              <p className="text-slate-300 text-sm">{area.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
