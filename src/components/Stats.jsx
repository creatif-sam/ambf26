import React, { useEffect, useState, useRef } from "react";

export default function Stats({
  title = "Event Statistics",
  stats = [
    { stat: 200, label: "Attendees", suffix: "+" },
    { stat: 30, label: "Speakers & Athletes", suffix: "+" },
    { stat: 80, label: "Organizations", suffix: "+" },
    { stat: 20, label: "Countries", suffix: "+" },
  ],
  className = "",
}) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`py-20 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto text-center">
        {title && (
          <h2 className="text-4xl font-bold mb-10 text-center">{title}</h2>
        )}
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((item, idx) => (
            <AnimatedStat
              key={idx}
              target={item.stat}
              label={item.label}
              suffix={item.suffix}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Animated Stat Block */
function AnimatedStat({ target, label, suffix = "", visible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1500; // 1.5 seconds
    const stepTime = 16;
    const step = Math.ceil(target / (duration / stepTime));

    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCount(start);
    }, stepTime);

    return () => clearInterval(interval);
  }, [visible, target]);

  return (
    <div className="transition transform hover:-translate-y-2">
      <div className="text-4xl font-extrabold text-amber-400 mb-2 drop-shadow-sm">
        {count}
        {suffix}
      </div>
      <p className="text-slate-300">{label}</p>
    </div>
  );
}
