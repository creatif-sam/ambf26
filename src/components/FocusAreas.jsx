import React from "react";

export default function FocusAreas({
  title = "Key Focus Areas",
  subtitle = "The African Sports Industry. Beyond the Game, Build the Economy",
  areas = [
    {
      icon: "💰",
      title: "Finance and Investment",
      desc: "Capital mobilization from development banks, institutional investors, and alternative funds"
    },
    {
      icon: "🏗️",
      title: "Infrastructure",
      desc: "World class sports facilities, stadiums, training centers, and regional hubs"
    },
    {
      icon: "🌍",
      title: "Talent and Human Capital",
      desc: "Youth development, athlete excellence, sports entrepreneurship, job creation"
    },
    {
      icon: "🧪",
      title: "Technology and Innovation",
      desc: "Sports tech, data analytics, digital platforms, sports betting technology, fintech"
    },
    {
      icon: "📺",
      title: "Media and Broadcast",
      desc: "Broadcasting rights, digital content, fan engagement, sports storytelling"
    },
    {
      icon: "🏥",
      title: "Sports Health and Medical Innovation",
      desc: "Sports medicine, athlete healthcare, telemedicine, nutrition, medical devices"
    },
    {
      icon: "📜",
      title: "Governance and Policy",
      desc: "Regulatory frameworks, continental standards, institutional clarity, responsible practices"
    },
    {
      icon: "♻️",
      title: "Sustainability",
      desc: "Sustainable agriculture, environmental protection, climate resilience, SDG alignment"
    },
    {
      icon: "🎯",
      title: "Responsible Gaming",
      desc: "Regulation of Africas USD 15B betting market, youth protection, financial inclusion"
    },
    {
      icon: "⭐",
      title: "Soft Power and Continental Leadership",
      desc: "Africas positioning in the global sports economy, economic sovereignty"
    }
  ],
  className = ""
}) {
  return (
    <section
      id="about"
      className={`py-24 px-4 bg-gradient-to-b from-slate-950 via-amber-900/10 to-slate-950 text-white ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-4 text-center tracking-tight">
          {title}
        </h2>

        <p className="text-center text-slate-300 mb-16 text-lg max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 place-items-stretch">
          {areas.map((area, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center bg-gradient-to-br from-amber-700/10 to-slate-900/30 border border-amber-500/30 rounded-2xl px-6 py-10 w-full h-full hover:border-amber-400/60 transition transform hover:-translate-y-2 shadow-lg hover:shadow-amber-500/20"
            >
              <div className="text-6xl mb-6" aria-hidden>
                {area.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white leading-snug">
                {area.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {area.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
