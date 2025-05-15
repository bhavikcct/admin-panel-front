import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import {
  RegisterFormData,
  registerSchema,
} from "@/validation/authvalidationschema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "react-toastify";
import { AuthSlice, selectAuth } from "@/features/auth/authslice";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { registerthunk } = AuthSlice();
  const { status, error } = useAppSelector(selectAuth);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await dispatch(registerthunk(data));
      if (!response?.message) return;
      toast.success(t("register.success"));
      navigate("/login");
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shadow-md mb-2">
          📝
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800">
          {t("register.title")}
        </h2>
        <p className="text-gray-500 text-sm">{t("register.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              {t("register.name")}
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              {t("register.email")}
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              {t("register.password")}
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              {t("register.confirm_password")}
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full cursor-pointer text-white py-3 rounded-xl font-semibold transition ${
            status === "loading"
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {status === "loading"
            ? t("register.registering")
            : t("register.register_button")}
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-6">
        {t("register.login_prompt")}{" "}
        <Link to="/login" className="text-blue-600 font-medium hover:underline">
          {t("register.login_link")}
        </Link>
      </p>
    </>
  );
}
