import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "@/components/sidebar";
export default function RootLayout() {
    const token = localStorage.getItem("token");
    if (!token) {
        return _jsx(Navigate, { to: "/login" });
    }
    return (_jsxs("div", { className: "flex h-screen", children: [_jsx(Sidebar, {}), _jsx("main", { className: "flex-1 overflow-y-auto p-4", children: _jsx(Outlet, {}) })] }));
}
