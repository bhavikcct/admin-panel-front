import LanguageSwitcher from "@/components/languageswitcher";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gray-50">
    <div className="absolute top-4 right-4">
      <LanguageSwitcher />
    </div>

    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
      <Outlet />
    </div>
  </div>
  );
}
