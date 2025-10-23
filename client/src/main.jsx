import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//Core Routes
import Login from "./pages/login";
import Signup from "./pages/signup";
import ChangePassword from "./pages/User_Account/changePassword";
import ForgotPassword from "./pages/User_Account/forgotPassword";
import Error404 from "./pages/Error_Pages/error404";
import Error403 from "./pages/Error_Pages/error403";
import AdminLayout from "./layout/adminLayout";
import Dashboard from "./pages/Dashboard/dashboard";
import { AuthProvider } from "./services/useAuthCheck";
import PrivateRoute from "./services/privateRoute";
import ProfilePage from "./pages/ProfilePage/profilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Utility Components
import UploadFile from "./pages/uploadFile/uploadFile";

// VM Management - NEW
import VMList from "./pages/VirtualMachines/vmList";
import TestDashboard from "./pages/Dashboard/testDashboard";

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/upload" element={<UploadFile />} />
                <Route path="/vms" element={<VMList />} />
              </Route>
            </Route>

            <Route path="/change-password" element={<ChangePassword />} />

            {/* Error pages */}
            <Route path="/403" element={<Error403 />} />
            <Route path="/404" element={<Error404 />} />

            {/* Default redirects */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
      <ToastContainer />
    </>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
