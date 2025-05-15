import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotpasswordschema, } from "@/validation/authvalidationschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { AuthSlice } from "@/features/auth/authslice";
import { useTranslation } from "react-i18next";
export default function ForgotPasswordPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { frogotpasswordthunk } = AuthSlice();
    const { status } = useSelector((state) => state.auth);
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(forgotpasswordschema),
    });
    const onSubmit = async (data) => {
        try {
            const response = await dispatch(frogotpasswordthunk(data));
            if (!response?.message)
                return;
            toast.success(t("forgot.success"));
            navigate("/login");
        }
        catch (error) {
            toast.error(error);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-col items-center mb-6", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shadow-md mb-2", children: "\uD83D\uDD11" }), _jsx("h2", { className: "text-2xl font-extrabold text-gray-800", children: t("forgot.title") }), _jsx("p", { className: "text-gray-500 text-sm", children: t("forgot.subtitle") })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 text-sm mb-1", children: t("forgot.email") }), _jsx("input", { ...register("email"), className: "w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition", type: "email", placeholder: t("forgot.email_placeholder") }), errors.email && (_jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.email.message }))] }), _jsx("button", { type: "submit", disabled: status === "loading", className: "w-full cursor-pointer bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50", children: status === "loading"
                            ? t("forgot.sending")
                            : t("forgot.send_button") })] }), _jsxs("p", { className: "text-sm text-center text-gray-600 mt-6", children: [t("forgot.login_prompt"), " ", _jsx(Link, { to: "/login", className: "text-blue-600 font-medium hover:underline", children: t("forgot.login_link") })] })] }));
}
