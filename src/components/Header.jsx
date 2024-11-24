import React from "react";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AssignmentIcon from "@mui/icons-material/Assignment";
import "../styles/Header.css";

function Header({ onOpenHomeworkDialog, toggleTheme, themeMode }) {
  return (
    <header className="app-header">
      <div className="logo-container">
        <img src="/assets/logo.png" alt="StudySync Logo" className="header-logo" />
        <h1>StudySync</h1>
      </div>
      <div>
        <IconButton color="inherit" onClick={toggleTheme}>
          {themeMode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        <IconButton
          color="inherit"
          onClick={onOpenHomeworkDialog}
          className="homework-button"
        >
          <AssignmentIcon />
        </IconButton>
      </div>
    </header>

  );
}

export default Header;
