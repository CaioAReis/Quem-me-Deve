/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppinsLight: ["Poppins-light"],
        poppinsRegular: ["Poppins-regular"],
        poppinsMedium: ["Poppins-medium"],
        poppinsBold: ["Poppins-bold"],
      },

      colors: {
        primary: {
          50: "#F1ECFF",
          100: "#D3C1FF",
          200: "#B496FF",
          300: "#966BFF",
          400: "#7740FE", // Main color
          500: "#5F2CDC",
          600: "#4A1CBA",
          700: "#371098",
          800: "#270676",
          900: "#180054",
        },

        secondary: {
          50: "#ECFFF1",
          100: "#C1FFD3",
          200: "#96FFB4",
          300: "#6BFF96",
          400: "#40FE77",
          500: "#2CDC5F", // Main color
          600: "#1CBA4A",
          700: "#109837",
          800: "#067627",
          900: "#005418",
        },

        gray: {
          50: "#F5F5F5",
          100: "#e9e9ea",
          200: "#d4d4d6",
          300: "#bebec1",
          400: "#949498", // Main color
          500: "#7e7e84",
          600: "#69696f",
          700: "#53535a",
          800: "#3e3e46",
          900: "#292932",
        },
      },
    },
  },
  plugins: [],
};
