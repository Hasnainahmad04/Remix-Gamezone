import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "card-dark": "#202020",
      },
    },
  },
  plugins: [],
} satisfies Config;
