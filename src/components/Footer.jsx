// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer
      className="relative text-white"
      aria-label="Site footer"
      style={{
        backgroundImage: "url(/images/footer-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* left column: logo and social icons */}
          <div className="flex flex-col lg:items-start items-center lg:justify-start">
            <div className="flex items-center space-x-4 mb-6 lg:translate-x-0">
              <img
                src="/ambf-logo.png"
                alt="AMBF logo"
                className="w-36 h-auto"
              />
            </div>

            <p className="text-slate-300 max-w-xs text-center lg:text-left mb-6">
              Building Africas sports economy from 0.5 percent to 5 percent of continental GDP
            </p>

            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/showcase/africamed-business-forum/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88071 3.86 6 2.48 6C1.1 6 0 4.88071 0 3.5C0 2.11929 1.12 1 2.48 1C3.86 1 4.98 2.11929 4.98 3.5Z" fill="currentColor"/>
                  <path d="M0 8.5H4.96V24H0V8.5Z" fill="currentColor"/>
                  <path d="M9.38 8.5H14.16V10.56H14.24C14.98 9.3 16.82 8 19.68 8C24.32 8 24 11.74 24 15.88V24H19.04V16.8C19.04 14.94 19 12.7 16.2 12.7C13.36 12.7 13 14.9 13 16.64V24H8.04V8.5H9.38Z" fill="currentColor"/>
                </svg>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=100089986179225"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12C2 16.84 5.66 20.9 10.44 21.82V14.89H7.9V12H10.44V9.8C10.44 7.31 11.93 5.98 14.2 5.98C15.28 5.98 16.42 6.16 16.42 6.16V8.64H15.02C13.64 8.64 13.26 9.49 13.26 10.37V12H16.29L15.78 14.89H13.26V21.82C18.04 20.9 22 16.84 22 12Z"/>
                </svg>
              </a>

              <a
                href="https://www.youtube.com/watch?v=UR1xJPOJU0Y"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M23.5 6.2c-.3-1.8-1.9-3.2-3.8-3.5C16.7 2 12 2 12 2s-4.7 0-7.7.7C1.9 3 0.3 4.4 0 6.2 0 6.2 0 9.1 0 12s0 5.8.3 5.8c.3 1.8 1.9 3.2 3.8 3.5C7.3 23 12 23 12 23s4.7 0 7.7-.7c1.9-.3 3.5-1.7 3.8-3.5.3 0 .3-2.9.3-5.8s0-5.8-.3-5.8zM9.6 15.6V8.4L16 12l-6.4 3.6z"/>
                </svg>
              </a>

              <a
                href="https://twitter.com/YourProfile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.88-2.37 8.55 8.55 0 01-2.71 1.03 4.26 4.26 0 00-7.27 3.89A12.09 12.09 0 013 5.6a4.26 4.26 0 001.32 5.69c-.66 0-1.28-.2-1.82-.5v.05a4.26 4.26 0 003.42 4.18c-.56.15-1.14.18-1.74.07a4.27 4.27 0 003.98 2.96A8.54 8.54 0 012 19.54a12.06 12.06 0 006.53 1.92c7.84 0 12.12-6.5 12.12-12.12 0-.18 0-.36-.01-.54A8.66 8.66 0 0022.46 6z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* center column: quick links with vertical rule */}
          <div className="flex justify-center">
            <div className="w-full max-w-xs text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>

              <ul className="space-y-4 text-slate-200">
                <li>
                  <a href="/#home" className="hover:underline">Home</a>
                </li>
                <li>
                  <a href="/#location" className="hover:underline">Location & Dates</a>
                </li>
                <li>
                  <a href="/#about" className="hover:underline">About the Summit</a>
                </li>
                <li>
                  <a href="/#speakers" className="hover:underline">Speakers</a>
                </li>
              </ul>
            </div>

            {/* vertical rule for large screens */}
            <div className="hidden lg:block h-full w-px bg-white/30 mx-8" />
          </div>

          {/* right column: contact and newsletter */}
          <div className="flex flex-col items-center lg:items-end">
            <div className="w-full max-w-md">
              <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
              <p className="text-slate-300 mb-4">Get in Touch</p>

              <div className="bg-white/10 p-4 rounded-md mb-6">
                <p className="text-sm">Email</p>
                <a href="mailto:info@africamedforum.com" className="block text-slate-100 mb-2">info@africamedforum.com</a>
                <p className="text-sm">Phone</p>
                <a href="tel:+1234567890" className="block text-slate-100">+ 212 655-401739</a>
              </div>

              <h3 className="text-2xl font-semibold mb-3">Join Our Newsletter</h3>
              <p className="text-slate-300 mb-4">We will send you a nice letter once per week. No spam.</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // handle subscribe action
                }}
                className="flex gap-3"
              >
                <input
                  type="email"
                  aria-label="Email address"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-3 py-2 rounded-l-md border border-white/10 bg-white/5 placeholder-slate-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-slate-900 font-semibold rounded-r-md hover:opacity-95"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* horizontal divider and copyright */}
        <div className="mt-12 border-t border-white/20 pt-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">Copyright 2025 Africamed Business Forum. All rights reserved.</p>
          <a href="/privacy" className="text-slate-300 text-sm hover:underline">Privacy policy</a>
        </div>
      </div>
    </footer>
  );
}
