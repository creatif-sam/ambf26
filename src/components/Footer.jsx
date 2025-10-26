// src/components/Footer.jsx
import React from "react";
import { Trophy } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-slate-900 border-t border-amber-500/20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-slate-900">
            <Trophy size={22} />
          </div>
          <span className="text-xl font-bold">Africamed Business Forum</span>
        </div>
        <p className="text-slate-400 mb-6">
          Building Africas sports economy, from 0.5% to 5% of continental GDP
        </p>
        <p className="text-sm text-slate-500">Copyright 2025 Africamed Business Forum. All rights reserved.</p>
      </div>
    </footer>
  );
}
