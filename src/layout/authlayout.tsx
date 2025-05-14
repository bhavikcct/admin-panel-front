import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
      <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">

      <Outlet />
      </div>
    </div>
  );
}
