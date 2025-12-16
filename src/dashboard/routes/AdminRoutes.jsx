import { Route } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import DashboardOverview from "../pages/DashboardOverview";
import ConferenceRegistrations from "../pages/ConferenceRegistrations";
import ClubMemberships from "../pages/ClubMemberships";

export const AdminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<DashboardOverview />} />
    <Route path="conference" element={<ConferenceRegistrations />} />
    <Route path="club" element={<ClubMemberships />} />
  </Route>
);
