// src/dashboard/layout/Topbar.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Topbar() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data?.user?.email || "");
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-slate-800">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">
        {email && (
          <span className="text-sm text-slate-600">
            {email}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-md bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
