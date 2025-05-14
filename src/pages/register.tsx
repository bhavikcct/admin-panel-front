import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

// Zod validation schema
const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Registering:", data);
  };

  return (
    <>
     <div className="flex flex-col items-center mb-6">
  <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shadow-md mb-2">
    📝
  </div>
  <h2 className="text-2xl font-extrabold text-gray-800">Create Account</h2>
  <p className="text-gray-500 text-sm">Register to get started</p>
</div>

<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
    <div>
      <label className="block text-gray-700 text-sm mb-1">Full Name</label>
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
      <label className="block text-gray-700 text-sm mb-1">Email</label>
      <input
        {...register("email")}
        type="email"
        placeholder="you@example.com"
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition"
      />
      {errors.email && (
        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
      )}
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
    <div>
      <label className="block text-gray-700 text-sm mb-1">Password</label>
      <input
        {...register("password")}
        type="password"
        placeholder="••••••••"
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition"
      />
      {errors.password && (
        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
      )}
    </div>

    <div>
      <label className="block text-gray-700 text-sm mb-1">Confirm Password</label>
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="••••••••"
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-xl outline-none transition"
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
      )}
    </div>
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
  >
    Register
  </button>
</form>

<p className="text-sm text-center text-gray-600 mt-6">
  Already have an account?{" "}
  <Link to="/login" className="text-blue-600 font-medium hover:underline">
    Login
  </Link>
</p>

    </>
  );
}
