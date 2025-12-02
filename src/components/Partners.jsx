// src/components/Partners.jsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/partners.css";

export default function Partners() {
  // list the filenames placed in public/partners
  const logos = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "akm.png",
    "diapason.png",
    "fagace.png",
    "foodshow.png",
    "force-emploi.png",
    "green-wave.png",
    "jaquar.png",
    "kardev.png",
    "pernova.png",
    "trivog.png",
    "whd.png"
  ];

  const [loadedCount, setLoadedCount] = useState(0);
  const trackRef = useRef(null);

  // when all logos have loaded add the animation class
  useEffect(() => {
    if (loadedCount === logos.length && trackRef.current) {
      // force reflow to ensure correct measurement
      // then add class that starts animation
      // using requestAnimationFrame gives browser one paint with images
      requestAnimationFrame(() => {
        trackRef.current.classList.add("partnersAnimate");
      });
    }
  }, [loadedCount, logos.length]);

  // increment load counter when each img fires onLoad or onError
  function handleImageLoad() {
    setLoadedCount((c) => c + 1);
  }

  return (
    <section className="py-20 px-4 bg-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-white">
          They trusted us
        </h2>

        <div className="partnersContainer rounded-lg">
          <div ref={trackRef} className="partnersTrack">
            {/* first group */}
            <div className="partnersGroup">
              {logos.map((file, i) => (
                <img
                  key={file}
                  src={`/partners/${file}`}
                  alt={`Partner logo ${i + 1}`}
                  className="partnersLogo"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                />
              ))}
            </div>

            {/* duplicate group for seamless loop */}
            <div aria-hidden="true" className="partnersGroup">
              {logos.map((file, i) => (
                <img
                  key={"dup" + file}
                  src={`/partners/${file}`}
                  alt=""
                  className="partnersLogo"
                  draggable="false"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
