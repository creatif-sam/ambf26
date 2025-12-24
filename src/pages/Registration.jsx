import { useState } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    sector: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);

    const { error } = await supabase
      .from("conference_registrations")
      .insert([
        {
          full_name: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          organization: formData.company.trim(),
          role: formData.position.trim(),
          sector: formData.sector,
          country: formData.country.trim(),
          status: "registered",
          payment_status: "not_required",
        },
      ]);

    if (error) {
      if (error.code === "23505") {
        toast.error("You have already registered.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
      setLoading(false);
      return;
    }

    toast.success("Registration received. Updates will be sent by email.");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      sector: "",
      country: "",
    });
    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 8,
    border: "1px solid rgba(245,158,11,0.4)",
    backgroundColor: "rgba(15,23,42,0.9)",
    color: "white",
    fontSize: 14,
  };

  return (
    <section
      id="register"
      style={{
        minHeight: "100vh",
        paddingTop: 80,
        paddingBottom: 80,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: "#020617",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 12 }}>
            Conference Registration
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: 16, maxWidth: 640, margin: "0 auto" }}>
            Join federations, leagues, clubs, investors, and innovators shaping Africa’s sports economy.
          </p>
        </header>

        <div
          style={{
            padding: 32,
            borderRadius: 16,
            border: "1px solid rgba(245,158,11,0.4)",
            background:
              "linearGradient(135deg, rgba(245,158,11,0.08), rgba(15,23,42,0.95))",
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <input
                name="fullName"
                placeholder="Full name"
                required
                value={formData.fullName}
                onChange={handleChange}
                style={inputStyle}
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <input
                name="phone"
                placeholder="Phone number"
                required
                value={formData.phone}
                onChange={handleChange}
                style={inputStyle}
              />
              <input
                name="company"
                placeholder="Organization or club"
                value={formData.company}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <input
                name="position"
                placeholder="Role or title"
                value={formData.position}
                onChange={handleChange}
                style={inputStyle}
              />
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select sector</option>
                <option value="governance">Sports governance and federations</option>
                <option value="clubs">Clubs and leagues</option>
                <option value="performance">High performance and coaching</option>
                <option value="tech">Sports technology and data</option>
                <option value="media">Broadcast and media</option>
                <option value="marketing">Sponsorship and marketing</option>
                <option value="infrastructure">Facilities and infrastructure</option>
                <option value="esports">Esports and gaming</option>
                <option value="investment">Investment and finance</option>
                <option value="other">Other</option>
              </select>
            </div>

            <input
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 8,
                padding: "14px 16px",
                borderRadius: 10,
                border: "none",
                backgroundColor: "#f59e0b",
                color: "#020617",
                fontSize: 16,
                fontWeight: 700,
                cursor: loading ? "notAllowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Submitting..." : "Complete registration"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
