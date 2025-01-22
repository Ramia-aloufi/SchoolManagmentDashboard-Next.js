import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        Sky: "#C3EBFA",
        SkyLight: "#EDF9FD",
        Purple: "#CFCEFF",
        PurpleLight: "#CFCEFF",
        Yellow: "#FAE27C",
         YellowLight: "#FEFCE8"

      },
    },
  },
  plugins: [],
} satisfies Config;
