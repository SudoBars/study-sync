import React from "react";
import "../styles/WelcomeScreen.css";

function WelcomeScreen() {
  return (
    <div className="welcome-screen">
      <img src="/assets/logo.png" alt="StudySync Logo" className="welcome-logo" />
      <h1 className="welcome-title">Добро пожаловать в StudySync</h1>
      <p className="welcome-subtitle">Организуйте ваше расписание легко и быстро</p>
    </div>
  );
}

export default WelcomeScreen;
