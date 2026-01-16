import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        osrs: {
          gold: "#ffb000",
          "gold-dark": "#c48c00",
          brown: "#3d2b1f",
          "brown-dark": "#2a1d14",
          "brown-light": "#5a4332",
          green: "#00ff00",
          red: "#ff3030",
        },
      },
      fontFamily: {
        runescape: ["Georgia", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
