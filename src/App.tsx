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
function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/project" element={<ProjectPage />} />

          
          {/* <Route path="/about" element={<About />} /> */}
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
