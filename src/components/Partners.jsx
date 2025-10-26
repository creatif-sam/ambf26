// src/components/Partners.jsx
import React from "react";

export default function Partners() {
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
