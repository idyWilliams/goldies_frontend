import type { Config } from "tailwindcss";
import TailwindForm from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        review:
          "linear-gradient(#d5a32b88,#e4d06433 ), url(./public/assets/reviews.png)",
        about:
          "linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)), url(/public/assets/about-us/about-banner.jpg)",
      },
      colors: {
        main: "#E4D064",
        goldie: {
          "50": "#fcfaee",
          "100": "#f7f2ce",
          "200": "#ede39a",
          "300": "#e4d064",
          "400": "#debe41",
          "500": "#d5a32b",
          "600": "#bc8123",
          "700": "#9d6020",
          "800": "#804b20",
          "900": "#6a3f1d",
          "950": "#3c210c",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [TailwindForm],
};
export default config;
