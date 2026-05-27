import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#05070a",
        panel: "#0b1017",
        muted: "#8a97a8",
        line: "rgba(148, 163, 184, 0.16)",
        electric: "#2f7df6",
        cyan: "#19d3ff",
      },
      boxShadow: {
        glow: "0 0 40px rgba(25, 211, 255, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
