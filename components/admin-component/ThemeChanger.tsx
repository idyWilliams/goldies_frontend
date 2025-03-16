"use client";
import { useState, useEffect } from "react";

const ThemeChanger = () => {
  const [primaryColor, setPrimaryColor] = useState("#3b82f6"); // Default
  const [secondaryColor, setSecondaryColor] = useState("#f43f5e");

  // Function to update the CSS variables
  const updateThemeColor = (primary: string, secondary: string) => {
    document.documentElement.style.setProperty("--brand", primary);
    document.documentElement.style.setProperty("--brand-light", secondary);
    localStorage.setItem("theme", JSON.stringify({ primary, secondary })); // Save to localStorage
  };

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const { primary, secondary } = JSON.parse(savedTheme);
      setPrimaryColor(primary);
      setSecondaryColor(secondary);
      updateThemeColor(primary, secondary);
    }
  }, []);

  return (
    <div className="space-y-4 p-4">
      <label className="block">
        <span className="text-sm font-medium">Primary Color</span>
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => {
            setPrimaryColor(e.target.value);
            updateThemeColor(e.target.value, secondaryColor);
          }}
          className="ml-2"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Secondary Color</span>
        <input
          type="color"
          value={secondaryColor}
          onChange={(e) => {
            setSecondaryColor(e.target.value);
            updateThemeColor(primaryColor, e.target.value);
          }}
          className="ml-2"
        />
      </label>

      <button
        className="mt-2 rounded bg-primary px-4 py-2 text-white"
        onClick={() => alert("Using primary color!")}
      >
        Test Primary Color
      </button>
    </div>
  );
};

export default ThemeChanger;
