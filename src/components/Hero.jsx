// src/components/Header.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/* -------------------- Animated Right Panel -------------------- */
function AnimatedPanel() {
  // scene: 0 = 0.5%→5% graph, 1 = ball → skyline
  const [scene, setScene] = useState(0);

  // Switch scenes every 5.5s
  useEffect(() => {
    const t = setInterval(() => setScene((s) => (s === 0 ? 1 : 0)), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-amber-500/30 overflow-hidden">
      {scene === 0 ? <GraphScene /> : <GameToEconomyScene />}
    </div>
  );
}

/* === Scene 1: 0.5% -> 5% progress graph (animated) === */
function GraphScene() {
  const [progress, setProgress] = useState(0.5); // percent
  const rafRef = useRef();

  useEffect(() => {
    let start;
    const target = 5; // 5%
    const duration = 3200;

    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setProgress(0.5 + (target - 0.5) * eased);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // SVG bar width maps 0→100, we only need 0–5 range visually
  const max = 5;
  const pct = Math.min(progress / max, 1);

  return (
    <div className="absolute inset-0 p-6">
      <svg viewBox="0 0 640 320" className="w-full h-full">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Axis line */}
        <line x1="60" y1="260" x2="580" y2="260" stroke="rgba(148,163,184,0.35)" strokeWidth="2" />

        {/* Tick marks (no text labels to honor “not text”) */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const x = 60 + (520 * i) / 5;
          return <line key={i} x1={x} y1="255" x2={x} y2="265" stroke="rgba(148,163,184,0.35)" strokeWidth="2" />;
        })}

        {/* Base bar bg */}
        <rect x="60" y="140" width="520" height="80" rx="10" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.25)" />

        {/* Animated bar */}
        <rect
          x="60"
          y="140"
          width={520 * pct}
          height="80"
          rx="10"
          fill="url(#gradBar)"
        />
        <defs>
          <linearGradient id="gradBar" x1="0" x2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fde047" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Glow */}
        <rect x="60" y="140" width={520 * pct} height="80" rx="10" fill="url(#glow)" opacity="0.35" />
        <defs>
          <linearGradient id="glow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Moving pulse dot */}
        <circle
          cx={60 + 520 * pct}
          cy="180"
          r="8"
          fill="#fde047"
        >
          <animate attributeName="r" values="6;8;6" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

/* === Scene 2: Football → Skyline animation === */
function GameToEconomyScene() {
  return (
    <div className="absolute inset-0">
      {/* Pitch background stripe */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-slate-900/40" />

      <svg viewBox="0 0 640 320" className="w-full h-full">
        {/* Ground */}
        <rect x="0" y="240" width="640" height="80" fill="rgba(148,163,184,0.15)" />

        {/* Moving ball */}
        <g>
          <circle id="ball" cx="120" cy="210" r="18" fill="#fff" stroke="#0f172a" strokeWidth="2">
            <animate attributeName="cx" values="120;520" dur="2.6s" begin="0s" fill="freeze" />
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 120 210" to="720 520 210" dur="2.6s" begin="0s" fill="freeze" />
          </circle>
          {/* Simple pentagon pattern */}
          <polygon points="120,195 112,205 116,216 124,216 128,205" fill="#0f172a">
            <animate attributeName="points" dur="2.6s" begin="0s" fill="freeze"
              values="
                120,195 112,205 116,216 124,216 128,205;
                520,195 512,205 516,216 524,216 528,205" />
          </polygon>
        </g>

        {/* Ball fades out near the end */}
        <g>
          <rect x="0" y="0" width="640" height="320" fill="transparent">
            <animate attributeName="opacity" values="0;0;1" dur="0.2s" begin="2.55s" fill="freeze" />
          </rect>
        </g>

        {/* Skyline grows in (economy) */}
        <g>
          {[
            { x: 480, w: 26, h: 30, delay: 2.4 },
            { x: 510, w: 20, h: 60, delay: 2.45 },
            { x: 535, w: 28, h: 90, delay: 2.5 },
            { x: 568, w: 22, h: 70, delay: 2.55 },
            { x: 594, w: 18, h: 50, delay: 2.6 },
          ].map((b, i) => (
            <rect
              key={i}
              x={b.x}
              y={240 - b.h}
              width={b.w}
              height={b.h}
              rx="3"
              fill="url(#bgrad)"
              opacity="0.95"
            >
              <animate attributeName="height" from="0" to={b.h} dur="0.7s" begin={`${b.delay}s`} fill="freeze" />
              <animate attributeName="y" from="240" to={240 - b.h} dur="0.7s" begin={`${b.delay}s`} fill="freeze" />
            </rect>
          ))}
          <defs>
            <linearGradient id="bgrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </g>

        {/* Soft glow on skyline */}
        <rect x="470" y="130" width="160" height="130" fill="#fde68a" opacity="0.18">
          <animate attributeName="opacity" values="0;0.18;0.08;0.18" dur="3s" repeatCount="indefinite" />
        </rect>
      </svg>
    </div>
  );
}

/* ------------------------- Header ------------------------- */
export default function Header({ eventStartISO, eventEndISO, onPrimary, onSecondary }) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [status, setStatus] = useState("upcoming");

  const eventStart = useMemo(() => new Date(eventStartISO), [eventStartISO]);
  const eventEnd = useMemo(() => new Date(eventEndISO), [eventEndISO]);

  const fmt = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      if (now < eventStart) {
        const d = +eventStart - +now;
        setStatus("upcoming");
        setCountdown({
          days: Math.floor(d / (1000 * 60 * 60 * 24)),
          hours: Math.floor((d / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((d / 1000 / 60) % 60),
          seconds: Math.floor((d / 1000) % 60),
        });
      } else if (now >= eventStart && now <= eventEnd) {
        setStatus("live");
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setStatus("ended");
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [eventStart, eventEnd]);

  return (
    <header id="home" className="pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Title + Theme + Countdown (NO strapline text) */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-3 leading-tight">
              AfricaMed <span className="text-amber-400">Business</span>{" "}
              <span className="text-yellow-300">Forum</span>
            </h1>
            <p className="text-sm tracking-widest text-slate-400 mb-4">3RD EDITION • 2026</p>

            {/* Theme (kept) */}
            <div className="mb-6">
              <p className="text-amber-300 font-extrabold uppercase text-sm">Theme</p>
              <h2 className="text-2xl md:text-3xl font-bold">
                The African <span className="text-yellow-300">Sports Industry</span>
              </h2>
            </div>

            {/* Countdown / Status */}
            <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/50 rounded-xl p-6 mb-6">
              {status === "upcoming" && (
                <>
                  <p className="text-sm font-semibold text-amber-300 mb-3 uppercase">Event Starts In</p>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { v: countdown.days, t: "DAYS", c: "text-amber-400" },
                      { v: countdown.hours, t: "HOURS", c: "text-yellow-300" },
                      { v: countdown.minutes, t: "MINS", c: "text-amber-400" },
                      { v: countdown.seconds, t: "SECS", c: "text-yellow-300" },
                    ].map((b, i) => (
                      <div key={i} className="bg-slate-900/80 rounded-lg p-3 text-center">
                        <div className={`text-3xl font-bold ${b.c}`}>{String(b.v).padStart(2, "0")}</div>
                        <div className="text-xs text-slate-400 mt-1">{b.t}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {status === "live" && (
                <div className="flex items-center gap-3 text-green-400 font-semibold">
                  <span className="inline-flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  Live now • {fmt.format(eventStart)} to {fmt.format(eventEnd)} (Africa/Casablanca)
                </div>
              )}
              {status === "ended" && (
                <div className="text-slate-300 font-medium">This event has ended. Thank you for your interest.</div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onPrimary}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 flex items-center justify-center"
              >
                Register Now
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button
                onClick={onSecondary}
                className="border-2 border-amber-400 hover:bg-amber-400/10 text-white font-bold py-4 px-8 rounded-lg transition"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right: Animated visual (graph → game→economy) */}
          <div className="hidden md:block relative">
            <div className="w-full h-96 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl opacity-20 absolute" />
            <AnimatedPanel />
          </div>
        </div>
      </div>
    </header>
  );
}
