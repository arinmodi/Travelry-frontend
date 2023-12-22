import { CssBaseline } from "@mui/material";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "screens/HomePage";
import LoginPage from "screens/LoginPage";
import RegisterPage from "screens/RegisterPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import VerifyEmailPage from "screens/VerifyEmailPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <CssBaseline />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/verify" element={<VerifyEmailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
