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
    },
  },
  plugins: [],
};
