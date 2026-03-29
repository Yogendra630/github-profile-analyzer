import React, { useEffect, useMemo, useState } from "react";
import Home from "./pages/Home.jsx";
import { getStoredTheme, setStoredTheme } from "./utils/storage.js";

const App = () => {
  const [theme, setTheme] = useState(getStoredTheme());

  useEffect(() => {
    document.body.dataset.theme = theme;
    setStoredTheme(theme);
  }, [theme]);

  const toggleTheme = useMemo(() => {
    return () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return <Home theme={theme} onToggleTheme={toggleTheme} />;
};

export default App;
