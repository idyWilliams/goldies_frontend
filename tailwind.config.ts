import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        outfit: "var(--font-outfit)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        categories:
          "linear-gradient(89deg, rgba(73, 72, 72, 0.60) -13.02%, rgba(17, 17, 17, 0.60) 65.2%)",

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
          // "50": "#fcfaee",
          // "75": "#f4e8ab",
          // "100": "#f7f2ce",
          // "200": "#ede39a",
          // "300": "#e4d064",
          // "400": "#debe41",
          // "500": "#d5a32b",
          // "600": "#bc8123",
          // "700": "#9d6020",
          // "800": "#804b20",
          // "900": "#6a3f1d",
          // "950": "#3c210c",
          "50": "#fef3f2",
          "100": "#fde8e6",
          "200": "#fbd1d0",
          "300": "#da3c44",
          "400": "#f27a7b",
          "500": "#da3c44", //primary
          "600": "#d93d4a",
          "700": "#b31d2e",
          "800": "#961b2c",
          "900": "#801b2c",
          "950": "#470a13",
        },
        brand: {
          "100": "var(--brand-light)",
          "200": "var(--brand)",
          primary: "#FF8195", // Soft Pink
          accent: "#F9476C", // Vibrant Pink-Red
          background: "#FAF2E8", // Warm Cream
          secondaryBg: "#FDD5C8", // Soft Peach
          dark: "#3A2E2E", // Deep Brown for text
          muted: "#A0A0A0", // Muted gray for disabled elements
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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

        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
} satisfies Config;

export default config;
