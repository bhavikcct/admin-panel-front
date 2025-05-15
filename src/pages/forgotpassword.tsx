import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Link, useNavigate } from "react-router-dom";
import {
  ForgotPasswordFormData,
  forgotpasswordschema,
} from "@/validation/authvalidationschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { AuthSlice } from "@/features/auth/authslice";
import { useTranslation } from "react-i18next";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { frogotpasswordthunk } = AuthSlice();
  const { status } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotpasswordschema),
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      const response = await dispatch(frogotpasswordthunk(data));
      if (!response?.message) return;
      toast.success(t("forgot.success"));
      navigate("/login");
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shadow-md mb-2">
          🔑
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800">
          {t("forgot.title")}
        </h2>
        <p className="text-gray-500 text-sm">{t("forgot.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm mb-1">
            {t("forgot.email")}
          </label>
          <input
            {...register("email")}
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition"
            type="email"
            placeholder={t("forgot.email_placeholder")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {status === "loading"
            ? t("forgot.sending")
            : t("forgot.send_button")}
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-6">
        {t("forgot.login_prompt")}{" "}
        <Link to="/login" className="text-blue-600 font-medium hover:underline">
          {t("forgot.login_link")}
        </Link>
      </p>
    </>
  );
}
