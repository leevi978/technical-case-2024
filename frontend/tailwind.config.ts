import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkgray: "#292929",
        lightgray: "#C5C5C5",
        secondarylight: "#BBDDFF",
      },
    },
  },
  plugins: [],
};
export default config;
