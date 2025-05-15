import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import RootLayout from "@/layout/rootlayout";
import AuthLayout from "@/layout/authlayout";
import { Loader } from "lucide-react";

const LogInPage = lazy(() => import("@/pages/login"));
const RegisterPage = lazy(() => import("@/pages/register"));
const ForgotPasswordPage = lazy(() => import("@/pages/forgotpassword"));
const ResetPasswordPage = lazy(() => import("@/pages/resetpassword"));
const HomePage = lazy(() => import("@/pages/home"));
const ProjectPage = lazy(() => import("@/pages/project"));
const EstimationTable = lazy(() => import("@/pages/estimationtable"));
const EstimationFormContainer = lazy(
  () => import("@/components/estimationformcontainer")
);

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center items-center">
            <Loader className="h-4 w-4" />
          </div>
        }
      >
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/estimation" element={<EstimationTable />} />
            <Route
              path="/estimation/add"
              element={<EstimationFormContainer />}
            />
            <Route
              path="/estimation/edit/:id"
              element={<EstimationFormContainer />}
            />
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
      </Suspense>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
