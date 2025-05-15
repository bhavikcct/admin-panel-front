import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginschema } from "@/validation/authvalidationschema";
import { Link, useNavigate } from "react-router-dom";
import { AuthSlice, setToken } from "@/features/auth/authslice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
export default function LoginPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { loginThunk } = AuthSlice();
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(loginschema),
    });
    const onSubmit = async (data) => {
        try {
            const response = await dispatch(loginThunk(data));
            toast.success(t("login.success"));
            if (response?.token) {
                localStorage.setItem("token", response?.token);
                dispatch(setToken(response?.token));
            }
            navigate("/");
        }
        catch (error) {
            toast.error(error);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-col items-center mb-6", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shadow-md mb-2", children: "\uD83D\uDD12" }), _jsx("h2", { className: "text-2xl font-extrabold text-gray-800", children: t("login.title") }), _jsx("p", { className: "text-gray-500 text-sm", children: t("login.subtitle") })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 text-sm mb-1", children: t("login.email") }), _jsx("input", { ...register("email"), className: "w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition", type: "email", placeholder: "you@example.com" }), errors.email && (_jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.email.message }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 text-sm mb-1", children: t("login.password") }), _jsx("input", { ...register("password"), className: "w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), errors.password && (_jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.password.message })), _jsx("div", { className: "text-right mt-1", children: _jsx(Link, { to: "/forgot-password", className: "text-sm text-blue-600 hover:underline", children: t("login.forgot_password") }) })] }), _jsx("button", { type: "submit", disabled: status === "loading", className: "w-full cursor-pointer bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50", children: status === "loading"
                            ? t("login.logging_in")
                            : t("login.login_button") }), error && _jsx("p", { className: "text-red-500 text-sm text-center", children: error })] }), _jsxs("p", { className: "text-sm text-center text-gray-600 mt-6", children: [t("login.register_prompt"), " ", _jsx(Link, { to: "/register", className: "text-blue-600 font-medium hover:underline", children: t("login.register_link") })] })] }));
}
