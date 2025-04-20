"use client";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ColorSwatch } from "iconsax-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";

const ThemeChanger = () => {
  const [primaryColor, setPrimaryColor] = useState("#3E2723");
  const [secondaryColor, setSecondaryColor] = useState("#F8F1E5");

  // update the CSS variables
  function updateThemeColor(primary: string, secondary: string) {
    document.documentElement.style.setProperty("--brand", primary);
    document.documentElement.style.setProperty("--brand-light", secondary);
    localStorage.setItem("theme", JSON.stringify({ primary, secondary }));
  }

  // Reset theme color
  const resetTheme = () => {
    setPrimaryColor("#3E2723");
    setSecondaryColor("#F8F1E5");
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

  // Update color the after reset
  useEffect(() => {
    updateThemeColor(primaryColor, secondaryColor);
  }, [primaryColor, secondaryColor]);

  return (
    <>
      <Popover>
        <PopoverTrigger className="fixed bottom-[20%] right-0 z-50 border-2 border-white bg-brand-200 p-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {" "}
                <ColorSwatch size={24} className="text-brand-100" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Choose your theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </PopoverTrigger>
        <PopoverContent>
          {" "}
          <div className=" space-y-4 p-4">
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

            <Button
              className="mt-2 rounded bg-brand-200  px-4 py-2 font-normal uppercase text-brand-100 hover:bg-brand-200"
              onClick={resetTheme}
            >
              Reset Theme
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ThemeChanger;
