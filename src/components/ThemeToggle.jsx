import React from "react";

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button className="theme-toggle" onClick={onToggle} type="button">
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
