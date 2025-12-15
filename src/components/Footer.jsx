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
              Building Africa's sports economy from 0.5 percent to 5 percent of continental GDP
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
  href="https://www.instagram.com/africamed_business_forum/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Instagram"
  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.51 4.51 0 0 0 12 7.5zm0 7.4A2.9 2.9 0 1 1 14.9 12 2.9 2.9 0 0 1 12 14.9zm4.75-7.9a1.05 1.05 0 1 1-1.05-1.05 1.05 1.05 0 0 1 1.05 1.05z" />
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
  href="https://x.com/AfricaMedForum"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="X"
  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M18.244 2H21.61l-7.357 8.404L22.9 22h-6.84l-5.36-6.973L4.61 22H1.24l7.87-9.002L1.1 2h6.98l4.84 6.302L18.244 2z" />
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
                <a href="mailto:info@africamedforum.com" className="block text-slate-100 mb-2">contact@africamedforum.com</a>
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
