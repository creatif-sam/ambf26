// src/components/Partners.jsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/partners.css";

export default function Partners() {
  // list partner logos with URLs
  const logos = [
    { file: "1.png", url: "https://www.badea.org" },
    { file: "2.png", url: "https://www.nepad.org" },
    { file: "3.png", url: "https://mdjs.ma" },
    { file: "4.png", url: "https://www.ascame.org/" },
    { file: "5.png", url: "https://www.pacci.org/" },
    { file: "akm.png", url: "https://akm-technologies.fr" },
    { file: "diapason.png", url: "https://diapason360.com" },
    { file: "fagace.png", url: "https://fagace.org" },
    { file: "foodshow.png", url: "https://foodshow.ma" },
    { file: "force-emploi.png", url: "https://www.forcemploi.ma/" },
    { file: "green-wave.png", url: "https://www.greenwave.ma/" },
    { file: "jaquar.png", url: "https://jaquarworld.ma/" },
    { file: "kardev.png", url: "https://kardev.ma" },
    { file: "pernova.png", url: "https://pernova.com" },
    { file: "trivog.png", url: "https://trivog.ma/" },
    { file: "whd.png", url: "https://whdagency.com" }
  ];

  const [loadedCount, setLoadedCount] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    if (loadedCount === logos.length && trackRef.current) {
      requestAnimationFrame(() => {
        trackRef.current.classList.add("partnersAnimate");
      });
    }
  }, [loadedCount, logos.length]);

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
              {logos.map((item, i) => (
                <a
                  key={item.file}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partnersLink"
                >
                  <img
                    src={`/partners/${item.file}`}
                    alt={`Partner logo ${i + 1}`}
                    className="partnersLogo"
                    onLoad={handleImageLoad}
                    onError={handleImageLoad}
                    draggable="false"
                  />
                </a>
              ))}
            </div>

            {/* duplicate group for seamless infinite scroll */}
            <div aria-hidden="true" className="partnersGroup">
              {logos.map((item) => (
                <a
                  key={"dup-" + item.file}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partnersLink"
                  draggable="false"
                >
                  <img
                    src={`/partners/${item.file}`}
                    alt=""
                    className="partnersLogo"
                    draggable="false"
                  />
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
