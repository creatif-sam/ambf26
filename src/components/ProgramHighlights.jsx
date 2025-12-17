// src/components/ProgramHighlights.jsx
import React from "react";
import { CheckCircle } from "lucide-react";

const PROGRAM = [
  {
    block: {
      title: "Strategic Sessions",
      subtitle: "Macro Economic Vision",
    },
    items: [
      "Sports as an economic driver",
      "Soft power and influence",
      "Investment and territorial planning",
    ],
  },
  {
    block: {
      title: "Sectoral Sessions",
      subtitle: "Industry Focus",
    },
    items: [
      "Professionalization and governance",
      "Impact and legacy",
      "Local production and value chain",
      "Territorial attractiveness",
    ],
  },
  {
    block: {
      title: "Business Sessions",
      subtitle: "Investment and Monetization",
    },
    items: [
      "Management and monetization",
      "Regulation and responsible growth",
      "Digital transformation",
      "Digital economy and content",
    ],
  },
  {
    block: {
      title: "Cross Cutting Sessions",
      subtitle: "Social and Human Impact",
    },
    items: [
      "Empowerment and equality",
      "FinTech and access to finance",
      "Well being and prevention",
      "Skills and human capital",
    ],
  },
  {
    block: {
      title: "Signature Session",
      subtitle: "High Level Debate",
    },
    items: [
      "Human capital and continental strategy",
    ],
  },
];

export default function ProgramHighlights() {
  return (
    <section
      id="program"
      className="py-20 px-4 bg-gradient-to-r from-slate-800/50 to-amber-900/50"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-12 text-center">
          Program Highlights
        </h2>

        <div className="grid md:grid-cols-5 gap-6">
          {PROGRAM.map((d, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-amber-500/30 bg-slate-900/50"
            >
              <h3 className="text-xl font-extrabold text-amber-300 leading-tight">
                {d.block.title}
              </h3>
              <p className="text-sm font-medium text-amber-200/70 mb-4">
                {d.block.subtitle}
              </p>

              <ul className="space-y-3 text-slate-300">
                {d.items.map((it, k) => (
                  <li key={k} className="flex items-start gap-3">
                    <CheckCircle
                      className="text-amber-300 flex-shrink-0"
                      width={18}
                      height={18}
                    />
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
