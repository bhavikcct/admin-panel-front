import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/validation/authvalidationschema";
import { useAppDispatch } from "@/store/hooks";
import { AuthSlice } from "@/features/auth/authslice";
import { useTranslation } from "react-i18next";

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { resetpasswordthunk } = AuthSlice();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error(t("reset.invalid_token"));
      return;
    }

    try {
      const response = await dispatch(
        resetpasswordthunk({
          token: token,
          newPassword: data.password,
        })
      );
      if (!response?.message) return;
      toast.success(response?.message);
      navigate("/login");
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {t("reset.title")}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            {t("reset.new_password")}
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder={t("reset.new_password_placeholder")}
            className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            {t("reset.confirm_password")}
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder={t("reset.confirm_password_placeholder")}
            className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          {isSubmitting ? t("reset.submitting") : t("reset.submit_button")}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
