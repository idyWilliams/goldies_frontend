// utils/fonts.js
import localFont from "@next/font/local";

const tomatoGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/tomatogrotesk-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/tomatogrotesk-bold-webfont.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/tomatogrotesk-light-webfont.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/tomatogrotesk-light-webfont.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/tomatogrotesk-regular-webfont.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../public/fonts/tomatogrotesk-regular-webfont.woff",
      weight: "normal",
      style: "normal",
    },
  ],
});

export default tomatoGrotesk;
