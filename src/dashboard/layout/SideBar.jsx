import { NavLink } from "react-router-dom"
import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CreditCard,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  const base =
    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all"

  const active =
    "bg-amber-500 text-slate-900 shadow"

  const inactive =
    "text-amber-100 hover:bg-amber-400/20 hover:text-white"

  return (
    <aside
      className={`min-h-screen border-r border-amber-500/30 bg-gradient-to-b from-black via-slate-900 to-amber-900 p-4 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <h2 className="text-lg font-extrabold text-amber-400 tracking-wide">
            AfricaMed
          </h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-amber-300 hover:text-white transition"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <LayoutDashboard size={20} />
          {!collapsed && <span>Overview</span>}
        </NavLink>

        <NavLink
          to="/admin/club"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Users size={20} />
          {!collapsed && <span>Club Memberships</span>}
        </NavLink>

        <NavLink
          to="/admin/conference"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <CalendarCheck size={20} />
          {!collapsed && <span>Conference Registrations</span>}
        </NavLink>

        <NavLink
          to="/admin/payments"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <CreditCard size={20} />
          {!collapsed && <span>Payments</span>}
        </NavLink>
      </nav>
    </aside>
  )
}
