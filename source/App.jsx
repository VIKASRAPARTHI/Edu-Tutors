import React, { useState, useEffect } from "react";
import useAppearanceStore from "./data/appearanceStore";
import useUserStore from "./data/userStore";
import MainView from "./pages/MainView.jsx";
import Login from "./pages/Login.jsx";

function Application() {
  const [currentView, setCurrentView] = useState("chat");
  const isNightMode = useAppearanceStore((state) => state.isNightMode);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isNightMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isNightMode]);

  return (
    <div className="application-wrapper">
      {isLoggedIn ? (
        <MainView
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Application;
