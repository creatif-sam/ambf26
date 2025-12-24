import { useState } from "react"
import { Menu, X, Download } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { downloadICS } from "../utils/ics"

export default function Navbar({
  sections = [],
  eventStartISO,
  eventEndISO
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const forumName = "AfricaMed Forum"
  const isAfricamed = forumName.toLowerCase().includes("africamed")

  const handleNav = (id) => {
    setMobileMenuOpen(false)

    if (id === "about") {
      navigate("/about")
      return
    }

    if (id === "register") {
      navigate("/register")
      return
    }

    if (id === "club") {
      navigate("/club")
      return
    }

    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 150)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-slate-900/95 to-amber-900/95 backdrop-blur-sm border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          <button
            aria-label="Go to home"
            onClick={() => handleNav("home")}
            className="flex items-center space-x-3 focus:outline-none"
          >
            {isAfricamed ? (
              <img
                src="/ambf-logo.png"
                alt="Africamed Forum Logo"
                className="w-36 h-auto object-contain"
              />
            ) : (
              <>
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-bold text-slate-900">
                  A
                </div>
                <span className="text-xl font-bold hidden sm:block">
                  {forumName}
                </span>
              </>
            )}
          </button>

          <div className="hidden md:flex space-x-8">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => handleNav(s.id)}
                className="hover:text-amber-400 transition duration-300 font-medium"
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                downloadICS({ start: eventStartISO, end: eventEndISO })
              }
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold border border-amber-400/60 px-3 py-2 rounded-lg hover:bg-amber-500/10"
            >
              <Download size={16} /> Add to Calendar
            </button>

            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden text-white"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => handleNav(s.id)}
                className="block w-full text-left px-4 py-2 hover:bg-amber-600/50 rounded transition"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
