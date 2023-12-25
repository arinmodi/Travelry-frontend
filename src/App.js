import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "screens/HomePage";
import LoginPage from "screens/LoginPage";
import RegisterPage from "screens/RegisterPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import VerifyEmailPage from "screens/VerifyEmailPage";
import DiaryPage from "screens/Diary/DiaryPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3A60F7"
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/verify" element={<VerifyEmailPage />} />
          <Route path="/diary" element={<DiaryPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
