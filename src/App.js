import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import { Calendar, Clock, MapPin } from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FocusAreas from "./components/FocusAreas";
import ProgramHighlights from "./components/ProgramHighlights";
import Stats from "./components/Stats";
import RegistrationForm from "./components/RegistrationForm";
import Partners from "./components/Partners";
import Footer from "./components/Footer";

import AboutUs from "./pages/AboutUs";
import ClubAfricamed from "./pages/ClubAfricamed";

import AdminLogin from "./dashboard/pages/AdminLogin";
import AdminLayout from "./dashboard/layout/AdminLayout";
import DashboardOverview from "./dashboard/pages/DashboardOverview";
import ConferenceRegistrations from "./dashboard/pages/ConferenceRegistrations";
import ClubMemberships from "./dashboard/pages/ClubMemberships";
//import { AdminRoutes } from "./dashboard/routes/AdminRoutes";
import PaymentValidations from "./dashboard/pages/PaymentValidations";
import AdminGuard from "./components/AdminGuard";

import { Toaster } from "react-hot-toast";

function Home() {
  const eventStartISO = "2026-01-16T08:30:00+01:00";
  const eventEndISO = "2026-01-17T18:00:00+01:00";

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Hero
        eventStartISO={eventStartISO}
        eventEndISO={eventEndISO}
        onPrimary={() => scrollTo("register")}
        onSecondary={() => scrollTo("about")}
      />

      <section aria-labelledby="details" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            <InfoCard icon={<Calendar />} title="Event Dates" text="16 to 17 January 2026" />
            <InfoCard icon={<Clock />} title="Schedule" text="08:30 to 18:00 daily" />
            <InfoCard icon={<MapPin />} title="Location" text="Casablanca, Morocco" />
          </div>
        </div>
      </section>

      <FocusAreas />
      <ProgramHighlights />
      <Stats />

      <section id="register" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Register today</h2>
          <p className="text-center text-slate-300 mb-12">
            Join federations, leagues, clubs, investors and innovators shaping Africa’s sports economy
          </p>
          <RegistrationForm />
        </div>
      </section>

      <Partners />
    </>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-3xl p-10 bg-slate-900/70 ring-1 ring-amber-400/35">
      <div className="mb-4 text-amber-300">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-slate-300">{text}</p>
    </div>
  );
}

export default function AfricaSportsForumWebsite() {
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "program", label: "Program" },
    { id: "register", label: "Register" },
    { id: "club", label: "Club Africamed" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 text-white">
      <Toaster position="top-center" />
      <Navbar forumName="Africamed Business Forum" sections={sections} />

      <main className="pt-20">
       <Routes>
  {/* Public routes */}
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<AboutUs />} />
  <Route path="/club" element={<ClubAfricamed />} />
  <Route path="/admin-login" element={<AdminLogin />} />

  {/* Admin routes */}
  <Route
    path="/admin"
    element={
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    }
  >
    <Route index element={<DashboardOverview />} />
    <Route path="conference" element={<ConferenceRegistrations />} />
    <Route path="club" element={<ClubMemberships />} />
     <Route path="payments" element={<PaymentValidations />} />
  </Route>
</Routes>

      </main>

      <Footer />
    </div>
  );
}
