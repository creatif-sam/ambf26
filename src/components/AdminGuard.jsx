import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { Navigate } from "react-router-dom"

export default function AdminGuard({ children }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null)
      setLoading(false)
    })
  }, [])

  if (loading) return null

  if (!user) {
    return <Navigate to="/admin-login" replace />
  }

  return children
}
