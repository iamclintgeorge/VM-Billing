import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Core Routes
import Login from "./pages/login";
import Signup from "./pages/signup";
import ChangePassword from "./pages/User_Account/changePassword";
import ForgotPassword from "./pages/User_Account/forgotPassword";
import Error404 from "./pages/Error_Pages/error404";
import Error403 from "./pages/Error_Pages/error403";
import AdminLayout from "./layout/adminLayout";
import { AuthProvider } from "./services/useAuthCheck";
import PrivateRoute from "./services/privateRoute";

import ProfilePage from "./pages/ProfilePage/profilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Utility Components
import UploadFile from "./pages/uploadFile/uploadFile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<AdminLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/upload_files"
            element={
              <PrivateRoute permission="upload_files">
                <UploadFile />
              </PrivateRoute>
            }
          />
          <Route path="/change_password" element={<ChangePassword />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
        </Route>
        <Route path="*" element={<Error404 />} />
        <Route path="/error403" element={<Error403 />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}
