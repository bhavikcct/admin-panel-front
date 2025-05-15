import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema, } from "@/validation/authvalidationschema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "react-toastify";
import { AuthSlice, selectAuth } from "@/features/auth/authslice";
import { useTranslation } from "react-i18next";
export default function RegisterPage() {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(registerSchema),
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { registerthunk } = AuthSlice();
    const { status, error } = useAppSelector(selectAuth);
    const onSubmit = async (data) => {
        try {
            const response = await dispatch(registerthunk(data));
            if (!response?.message)
                return;
            toast.success(t("register.success"));
            navigate("/login");
        }
        catch (error) {
            toast.error(error);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-col items-center mb-6", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shadow-md mb-2", children: "\uD83D\uDCDD" }), _jsx("h2", { className: "text-2xl font-extrabold text-gray-800", children: t("register.title") }), _jsx("p", { className: "text-gray-500 text-sm", children: t("register.subtitle") })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 text-sm mb-1", children: t("register.name") }), _jsx("input", { ...register("name"), type: "text", placeholder: "John Doe", className: "w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition" }), errors.name && (_jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.name.message }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 text-sm mb-1", children: t("register.email") }), _jsx("input", { ...register("email"), type: "email", placeholder: "you@example.com", className: "w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition" }), errors.email && (_jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.email.message }))] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 text-sm mb-1", children: t("register.password") }), _jsx("input", { ...register("password"), type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition" }), errors.password && (_jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.password.message }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 text-sm mb-1", children: t("register.confirm_password") }), _jsx("input", { ...register("confirmPassword"), type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition" }), errors.confirmPassword && (_jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.confirmPassword.message }))] })] }), _jsx("button", { type: "submit", disabled: status === "loading", className: `w-full cursor-pointer text-white py-3 rounded-xl font-semibold transition ${status === "loading"
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"}`, children: status === "loading"
                            ? t("register.registering")
                            : t("register.register_button") })] }), _jsxs("p", { className: "text-sm text-center text-gray-600 mt-6", children: [t("register.login_prompt"), " ", _jsx(Link, { to: "/login", className: "text-blue-600 font-medium hover:underline", children: t("register.login_link") })] })] }));
}
