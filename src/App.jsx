import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline, IconButton } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScheduleTable from "./components/ScheduleTable";
import HomeworkDialog from "./components/HomeworkDialog";
import WelcomeScreen from "./components/WelcomeScreen";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function App() {
  const [homeworks, setHomeworks] = useState(() => {
    const savedData = localStorage.getItem("homeworks");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [isHomeworkDialogOpen, setIsHomeworkDialogOpen] = useState(false);
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });
  const [showWelcome, setShowWelcome] = useState(true);

  // Приветствие показывается 3 секунды
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Автосохранение домашних заданий
  useEffect(() => {
    localStorage.setItem("homeworks", JSON.stringify(homeworks));
  }, [homeworks]);

  // Сохранение темы
  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  // Тема Material-UI
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode === "dark" ? "#7c4dff" : "#7c4dff", // Фиолетовый
      },
      secondary: {
        main: themeMode === "dark" ? "#5a2fc1" : "#b39ddb", // Дополнительный цвет
      },
      background: {
        default: themeMode === "dark" ? "#1c1c1e" : "#f4f4f9", // Тёмный для ночной темы
        paper: themeMode === "dark" ? "#2c2c2e" : "#ffffff", // Лёгкий серый для карточек
      },
      text: {
        primary: themeMode === "dark" ? "#f0f0f0" : "#1c1c1e", // Светлый текст
      },
    },
  });
  

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        {showWelcome && <WelcomeScreen />}
        {!showWelcome && (
          <>
            <Header
              onOpenHomeworkDialog={() => setIsHomeworkDialogOpen(true)}
              toggleTheme={toggleTheme}
              themeMode={themeMode}
            />
            <main className="main-content">
              <ScheduleTable />
            </main>
            <Footer />
            <HomeworkDialog
              open={isHomeworkDialogOpen}
              onClose={() => setIsHomeworkDialogOpen(false)}
              homeworks={homeworks}
              setHomeworks={setHomeworks}
            />
          </>
        )}
      </div>
    </ThemeProvider>
  );
  
}

export default App;
