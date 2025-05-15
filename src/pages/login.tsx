import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginschema } from "@/validation/authvalidationschema";
import { Link, useNavigate } from "react-router-dom";
import { AuthSlice, setToken } from "@/features/auth/authslice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const { loginThunk } = AuthSlice();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginschema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await dispatch(loginThunk(data));
      toast.success(t("login.success"));
      if (response?.token) {
        localStorage.setItem("token", response?.token);
        dispatch(setToken(response?.token));
      }
      navigate("/");
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shadow-md mb-2">
          🔒
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800">
          {t("login.title")}
        </h2>
        <p className="text-gray-500 text-sm">{t("login.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm mb-1">
            {t("login.email")}
          </label>
          <input
            {...register("email")}
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition"
            type="email"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-1">
            {t("login.password")}
          </label>
          <input
            {...register("password")}
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition"
            type="password"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
          <div className="text-right mt-1">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              {t("login.forgot_password")}
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {status === "loading"
            ? t("login.logging_in")
            : t("login.login_button")}
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>

      <p className="text-sm text-center text-gray-600 mt-6">
        {t("login.register_prompt")}{" "}
        <Link
          to="/register"
          className="text-blue-600 font-medium hover:underline"
        >
          {t("login.register_link")}
        </Link>
      </p>
    </>
  );
}
