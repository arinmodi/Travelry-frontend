import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "screens/HomePage";
import LoginPage from "screens/LoginPage";
import RegisterPage from "screens/RegisterPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import VerifyEmailPage from "screens/VerifyEmailPage";
import DiaryPage from "screens/Diary/DiaryPage";
import Media from "screens/Media";
import DiarysPage from "screens/Diarys";
import Profile from "screens/profile";
import { useSelector } from "react-redux";
import ActivitiesPage from "screens/Activities";


const theme = createTheme({
  palette: {
    primary: {
      main: "#3A60F7"
    },
  },
});

function App() {

  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <ToastContainer />
        <Routes>
          <Route path="/" element={isAuth ? <Navigate to="/home" /> : <LoginPage />} />
          <Route path="/register" element={isAuth ? <Navigate to="/home" /> : <RegisterPage />} />
          <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/verify" element={isAuth ? <Navigate to="/home" /> : <VerifyEmailPage />} />
          <Route path="/diary/:id" element={isAuth ? <DiaryPage /> : <Navigate to="/" />} />
          <Route path="/diary/:id/media/:mid" element={isAuth ? <Media /> : <Navigate to="/" />} />
          <Route path="/diarys" element={isAuth ? <DiarysPage />: <Navigate to="/" />} />
          <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/" />} />
          <Route path="/activities" element={isAuth ? <ActivitiesPage /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
