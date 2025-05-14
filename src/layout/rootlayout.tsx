import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  FolderKanban,
  Calculator,
  LogOut,
} from "lucide-react";
import Sidebar from "@/components/sidebar";

export default function RootLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar/>

      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
