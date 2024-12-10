/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
,
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        
      },
      colors: {
        'main': {
          color: "#FACC15",
          darker: "#EAB308",
          lighter: "#FEF08A",
          subtle: "#FDE047",
        },
        error: {
          1: "#F87171",
          2: "#EF4444",
          3: "#DC2626",
        },
        warning: {
          1: "#FEF08A",
          2: "#FDE047",
          3: "#FACC15",
        },
        info: {
          1: "#60A5FA",
          2: "#3B82F6",
          3: "#2563EB",
        },
        success: {
          1: "#4ADE80",
          2: "#22C55E",
          3: "#16A34A",
        },
        dark: {
          1: "#1A1A1A",
          2: "#1F2937",
          3: "#6B7280",
          4: "#C7C9D9",
        },
        light: {
          1: "#DDE5E9",
          2: "#EBEBF0",
          3: "#F2F2F5",
          4: "#FAFAFC",
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [
    // eslint-disable-next-line no-undef
    require('flowbite/plugin'),
    // eslint-disable-next-line no-undef
    require("daisyui"),
  ],
  daisyui: {
    themes: ["light"],
    utils: true,
    prefix: "",
  },
};
