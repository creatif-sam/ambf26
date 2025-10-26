import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/* -------------------- Animated Right Panel -------------------- */
function AnimatedPanel() {
  const [scene, setScene] = useState(0); // 0 = graph, 1 = classic game→economy
  useEffect(() => {
    const t = setInterval(() => setScene((s) => (s === 0 ? 1 : 0)), 5600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-amber-500/30 overflow-hidden">
      {scene === 0 ? <GraphScene /> : <ClassicGameToEconomyScene />}
    </div>
  );
}

/* === Scene 1: 0.5% -> 5% progress graph with title cue === */
function GraphScene() {
  const [progress, setProgress] = useState(0.5);
  const rafRef = useRef();

  useEffect(() => {
    let start;
    const target = 5;
    const duration = 3200;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(0.5 + (target - 0.5) * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const max = 5;
  const pct = Math.min(progress / max, 1);

  return (
    <div className="absolute inset-0 p-6">
      <svg viewBox="0 0 640 320" className="w-full h-full">
        {/* Title cue */}
        <text x="60" y="36" fill="#fde68a" fontSize="16" fontWeight="700">
          Sports Share of Continental GDP
        </text>
        <text x="60" y="56" fill="#fbbf24" fontSize="13" fontWeight="600">
          0.5% → 5%
        </text>

        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Axis line */}
        <line x1="60" y1="260" x2="580" y2="260" stroke="rgba(148,163,184,0.35)" strokeWidth="2" />

        {/* Ticks */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const x = 60 + (520 * i) / 5;
          return <line key={i} x1={x} y1="255" x2={x} y2="265" stroke="rgba(148,163,184,0.35)" strokeWidth="2" />;
        })}

        {/* Base bar bg */}
        <rect x="60" y="140" width="520" height="80" rx="10" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.25)" />

        {/* Animated bar */}
        <rect x="60" y="140" width={520 * pct} height="80" rx="10" fill="url(#gradBar)" />
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

        {/* Pulse dot */}
        <circle cx={60 + 520 * pct} cy="180" r="8" fill="#fde047">
          <animate attributeName="r" values="6;8;6" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

/* === Scene 2: More classic game → economy sequence === */
function ClassicGameToEconomyScene() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/15 to-slate-900/40" />
      <svg viewBox="0 0 640 320" className="w-full h-full">
        {/* Pitch line */}
        <line x1="40" y1="230" x2="600" y2="230" stroke="rgba(148,163,184,0.35)" strokeWidth="2" />

        {/* Simple goal (classic) */}
        <g opacity="0.9">
          <line x1="520" y1="170" x2="520" y2="230" stroke="#fbbf24" strokeWidth="4" />
          <line x1="520" y1="170" x2="580" y2="170" stroke="#fbbf24" strokeWidth="4" />
          <line x1="580" y1="170" x2="580" y2="230" stroke="#fbbf24" strokeWidth="4" />
        </g>

        {/* Ball, gentle roll into goal (no spin flood) */}
        <g>
          <circle cx="120" cy="210" r="16" fill="#ffffff" stroke="#0f172a" strokeWidth="2">
            <animate attributeName="cx" values="120;520" dur="2.2s" begin="0s" fill="freeze" />
          </circle>
          {/* Classic pentagon hint */}
          <polygon points="120,198 114,206 117,214 123,214 126,206" fill="#0f172a" opacity="0.9">
            <animate attributeName="points" dur="2.2s" begin="0s" fill="freeze"
              values="
                120,198 114,206 117,214 123,214 126,206;
                520,198 514,206 517,214 523,214 526,206" />
          </polygon>
        </g>

        {/* Gentle goal flash */}
        <rect x="515" y="160" width="70" height="80" fill="#fde68a" opacity="0">
          <animate attributeName="opacity" values="0;0;0.35;0" dur="0.6s" begin="2.2s" />
        </rect>

        {/* Fade to classic skyline silhouette */}
        <rect x="0" y="0" width="640" height="320" fill="#0b1020" opacity="0">
          <animate attributeName="opacity" values="0;0;0.55" dur="0.5s" begin="2.3s" fill="freeze" />
        </rect>

        {/* Minimal skyline, rise + fade in */}
        <g opacity="0">
          {[
            { x: 460, w: 22, h: 40, delay: 2.3 },
            { x: 488, w: 26, h: 70, delay: 2.35 },
            { x: 520, w: 30, h: 100, delay: 2.4 },
            { x: 556, w: 22, h: 72, delay: 2.45 },
            { x: 584, w: 18, h: 54, delay: 2.5 },
          ].map((b, i) => (
            <rect key={i} x={b.x} y={240 - b.h} width={b.w} height={b.h} fill="#fbbf24">
              <animate attributeName="height" from="0" to={b.h} dur="0.7s" begin={`${b.delay}s`} fill="freeze" />
              <animate attributeName="y" from="240" to={240 - b.h} dur="0.7s" begin={`${b.delay}s`} fill="freeze" />
              <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin={`${b.delay}s`} fill="freeze" />
            </rect>
          ))}
        </g>
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
    weekday: "short", year: "numeric", month: "long", day: "2-digit", hour: "2-digit", minute: "2-digit",
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
          {/* Left: Title + Theme + Countdown */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-3 leading-tight">
              AfricaMed <span className="text-amber-400">Business</span>{" "}
              <span className="text-yellow-300">Forum</span>
            </h1>
            <p className="text-sm tracking-widest text-slate-400 mb-4">3RD EDITION • 2026</p>

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

          {/* Right: Animated visual */}
          <div className="hidden md:block relative">
            <div className="w-full h-96 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl opacity-20 absolute" />
            <AnimatedPanel />
          </div>
        </div>
      </div>
    </header>
  );
}
