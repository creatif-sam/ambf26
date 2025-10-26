import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/* -------------------- Animated Right Panel -------------------- */
function AnimatedPanel() {
  const [scene, setScene] = useState(0);
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

/* === Scene 1: Progress graph === */
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
        <text x="60" y="36" fill="#fde68a" fontSize="16" fontWeight="700">
          Sports Share of Continental GDP
        </text>
        <text x="60" y="56" fill="#fbbf24" fontSize="13" fontWeight="600">
          0.5% → 5%
        </text>

        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        <line x1="60" y1="260" x2="580" y2="260" stroke="rgba(148,163,184,0.35)" strokeWidth="2" />

        {[0, 1, 2, 3, 4, 5].map((i) => {
          const x = 60 + (520 * i) / 5;
          return <line key={i} x1={x} y1="255" x2={x} y2="265" stroke="rgba(148,163,184,0.35)" strokeWidth="2" />;
        })}

        <rect x="60" y="140" width="520" height="80" rx="10" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.25)" />

        <rect x="60" y="140" width={520 * pct} height="80" rx="10" fill="url(#gradBar)" />
        <defs>
          <linearGradient id="gradBar" x1="0" x2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fde047" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        <circle cx={60 + 520 * pct} cy="180" r="8" fill="#fde047">
          <animate attributeName="r" values="6;8;6" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

/* === Scene 2: Game → Economy === */
function ClassicGameToEconomyScene() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/15 to-slate-900/40" />
      <svg viewBox="0 0 640 320" className="w-full h-full">
        <line x1="40" y1="230" x2="600" y2="230" stroke="rgba(148,163,184,0.35)" strokeWidth="2" />
        <g opacity="0.9">
          <line x1="520" y1="170" x2="520" y2="230" stroke="#fbbf24" strokeWidth="4" />
          <line x1="520" y1="170" x2="580" y2="170" stroke="#fbbf24" strokeWidth="4" />
          <line x1="580" y1="170" x2="580" y2="230" stroke="#fbbf24" strokeWidth="4" />
        </g>
        <g>
          <circle cx="120" cy="210" r="16" fill="#ffffff" stroke="#0f172a" strokeWidth="2">
            <animate attributeName="cx" values="120;520" dur="2.2s" begin="0s" fill="freeze" />
          </circle>
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
    <header
      id="home"
      className="pt-32 pb-20 px-4 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/stadium.png')" }}
    >
      {/* Dark overlay to make content readable */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* MOBILE-CENTERED / DESKTOP-LEFT TEXT */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h1 className="text-5xl md:text-6xl font-bold mb-3 leading-tight text-white">
              AfricaMed <span className="text-amber-400">Business</span>{" "}
              <span className="text-yellow-300">Forum</span>
            </h1>
            <p className="text-sm tracking-widest text-slate-300 mb-4">3RD EDITION • 2026</p>

            <div className="mb-6">
              <p className="text-sm font-extrabold uppercase text-amber-300 mb-1">Theme</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                The African <span className="text-yellow-300">Sports Industry</span>
              </h2>
            </div>

            {/* Counter box — fixed for large screens */}
            <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/50 rounded-xl p-6 mb-6 text-white md:self-start">
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
                <div className="flex items-center justify-center md:justify-start gap-3 text-green-400 font-semibold">
                  <span className="inline-flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  Live now • {fmt.format(eventStart)} to {fmt.format(eventEnd)} (Africa/Casablanca)
                </div>
              )}
              {status === "ended" && (
                <div className="text-slate-300 font-medium">This event has ended. Thank you for your interest.</div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button
                onClick={onPrimary}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 flex items-center justify-center w-full sm:w-auto"
              >
                Register Now
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button
                onClick={onSecondary}
                className="border-2 border-amber-400 hover:bg-amber-400/10 text-white font-bold py-4 px-8 rounded-lg transition w-full sm:w-auto"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* SHOW ANIMATION ON MOBILE TOO (CENTERED BELOW TEXT) */}
          <div className="block md:block relative mt-8 md:mt-0 w-full max-w-md md:max-w-none mx-auto md:mx-0">
            <AnimatedPanel />
          </div>
        </div>
      </div>
    </header>
  );
}
