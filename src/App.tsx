import { Route, Routes } from "react-router-dom";

// pages import
import RootLayout from "@/layout/rootlayout";
import AuthLayout from "@/layout/authlayout";
import LogInPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import ForgotPasswordPage from "@/pages/forgotpassword";
function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
