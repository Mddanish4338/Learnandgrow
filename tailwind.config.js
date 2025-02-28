const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    },
  },
  plugins: [
    nextui({
      defaultTheme: "light",
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#FFD700",
              foreground: "#000000",
            },
          },
        },
      },
    }),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-animate')
  ],
};