import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LanguageSwitcher from "@/components/languageswitcher";
import { Navigate, Outlet } from "react-router-dom";
export default function AuthLayout() {
    const token = localStorage.getItem("token");
    if (token) {
        return _jsx(Navigate, { to: "/" });
    }
    return (_jsxs("div", { className: "relative min-h-screen flex items-center justify-center px-4 bg-gray-50", children: [_jsx("div", { className: "absolute top-4 right-4", children: _jsx(LanguageSwitcher, {}) }), _jsx("div", { className: "w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10", children: _jsx(Outlet, {}) })] }));
}
