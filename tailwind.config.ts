import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "card-dark": "#202020",
        "primary-light": "#737373",
      },
    },
  },
  plugins: [],
} satisfies Config;
