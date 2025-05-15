import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// pages import
import RootLayout from "@/layout/rootlayout";
import AuthLayout from "@/layout/authlayout";
import LogInPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import ForgotPasswordPage from "@/pages/forgotpassword";
import HomePage from "@/pages/home";
import ResetPasswordPage from "@/pages/resetpassword";
import ProjectPage from "@/pages/project";
// import EstimationPage from "./pages/estimation";
import EstimationTable from "./pages/estimationtable";
import EstimationFormContainer from "./components/estimationformcontainer";
function App() {
    return (_jsxs(_Fragment, { children: [_jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(RootLayout, {}), children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/project", element: _jsx(ProjectPage, {}) }), _jsx(Route, { path: "/estimation", element: _jsx(EstimationTable, {}) }), _jsx(Route, { path: "/estimation/add", element: _jsx(EstimationFormContainer, {}) }), _jsx(Route, { path: "/estimation/edit/:id", element: _jsx(EstimationFormContainer, {}) })] }), _jsxs(Route, { element: _jsx(AuthLayout, {}), children: [_jsx(Route, { path: "/login", element: _jsx(LogInPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: "/forgot-password", element: _jsx(ForgotPasswordPage, {}) }), _jsx(Route, { path: "/reset-password/:token", element: _jsx(ResetPasswordPage, {}) })] })] }), _jsx(ToastContainer, { position: "top-right", autoClose: 3000 })] }));
}
export default App;
