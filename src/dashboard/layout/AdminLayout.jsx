import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
