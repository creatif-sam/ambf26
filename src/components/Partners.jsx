// src/components/Partners.jsx
import React from "react";
import "../styles/partners.css";

export default function Partners() {
  const logos = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "akm.png",
    "diapason.png",
    "fagace.png",
    "foodshow.png",
    "force-emploi.png",
    "green-wave.png",
    "jaquar.png",
    "kardev.png",
    "mdjs.png",
    "mdsj.png",
    "pernova.png",
    "trivog.png",
    "whd.png"
  ];

  return (
    <section className="py-20 px-4 bg-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-white">
          They trusted us
        </h2>

        <div className="partners-container">
          <div className="partners-track">
            {logos.map((file, index) => (
              <img
                key={index}
                src={`/partners/${file}`}
                alt="Partner logo"
                className="partners-logo"
              />
            ))}

            {logos.map((file, index) => (
              <img
                key={index + logos.length}
                src={`/partners/${file}`}
                alt="Partner logo duplicate"
                className="partners-logo"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
