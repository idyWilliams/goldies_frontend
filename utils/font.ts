// utils/fonts.js
import localFont from "@next/font/local";

const tomatoGrotesk = localFont({
  src: [
    {
      path: "public/fonts/tomatogrotesk-bold-webfont.woff2",
      weight: "700",
      style: "normal",
      //   format: "woff2",
    },
    {
      path: "public/fonts/tomatogrotesk-bold-webfont.woff",
      weight: "700",
      style: "normal",
      //   format: "woff",
    },
    {
      path: "public/fonts/tomatogrotesk-light-webfont.woff2",
      weight: "300",
      style: "normal",
      //   format: "woff2",
    },
    {
      path: "public/fonts/tomatogrotesk-light-webfont.woff",
      weight: "300",
      style: "normal",
      //   format: "woff",
    },
    {
      path: "public/fonts/tomatogrotesk-regular-webfont.woff2",
      weight: "normal",
      style: "normal",
      //   format: "woff2",
    },
    {
      path: "public/fonts/tomatogrotesk-regular-webfont.woff",
      weight: "normal",
      style: "normal",
      //   format: "woff",
    },
  ],
});

export default tomatoGrotesk;
