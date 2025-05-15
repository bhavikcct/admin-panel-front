import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Calculator, FolderKanban, LayoutDashboard, LogOut, Menu, X, } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const navItems = [
        { name: "Dashboard", path: "/", icon: _jsx(LayoutDashboard, { size: 20 }) },
        { name: "Project", path: "/project", icon: _jsx(FolderKanban, { size: 20 }) },
        { name: "Estimation", path: "/estimation", icon: _jsx(Calculator, { size: 20 }) },
    ];
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "md:hidden p-4 flex items-center justify-between bg-white border-b shadow-sm", children: [_jsx("button", { onClick: toggleSidebar, children: isOpen ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) }), _jsx("span", { className: "text-lg font-bold text-gray-800", children: "My App" })] }), _jsxs("aside", { className: clsx("fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 md:relative md:translate-x-0 md:flex flex-col justify-between", isOpen ? "translate-x-0" : "-translate-x-full"), children: [_jsx("nav", { className: "p-4 space-y-2", children: navItems.map((item) => (_jsxs("button", { onClick: () => {
                                navigate(item.path);
                                setIsOpen(false);
                            }, className: clsx("flex items-center cursor-pointer w-full gap-3 px-4 py-2 text-left rounded-lg transition", location.pathname === item.path
                                ? "bg-blue-100 text-blue-600 font-semibold"
                                : "hover:bg-gray-100 text-gray-700"), children: [item.icon, _jsx("span", { children: item.name })] }, item.name))) }), _jsx("div", { className: "p-4", children: _jsxs("button", { onClick: handleLogout, className: "flex cursor-pointer items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-red-100 text-red-600 transition", children: [_jsx(LogOut, { size: 20 }), _jsx("span", { children: "Logout" })] }) })] })] }));
};
export default Sidebar;
