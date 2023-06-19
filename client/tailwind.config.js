/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        DEFAULT: ["var(--font-roboto)"],
        body: ["var(--font-montserrat)"],
        address: ["var(--font-space-mono)"],
        emoji: ["var(--font-noto-emoji)"],
        "emoji-color": ["var(--font-noto-color-emoji)"],
      },
      colors: {
        grey: {
          100: "#42464E",
          200: "#303136",
          300: "#212226",
          400: "#18191D",
        },
        primary: {
          100: "#80C1F9",
          200: "#40A3F7",
          300: "#0084F4",
        },
        text: {
          primary: "#303030",
          secondary: "#D9D9D9",
          slatePlaceholder: "#C0CBE9",
        },
      },
      backgroundColor: {
        body: "#F9FAFF",
        slate: "#181E2E",
        "slate-input": "#2A3552",
        nav: "#FFFFFF",
        card: "#1E1F24",
        profile: "#41464F",
      },
    },
  },
  plugins: [],
};
