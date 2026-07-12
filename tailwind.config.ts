import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",   // Deep Slate/Navy
        secondary: "#D97706", // Golden/Amber
        neutralBg: "#F8FAFC", // Off-white Background
      },
    },
  },
  plugins: [],
};
export default config;