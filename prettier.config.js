module.exports = {
  printWidth: 100,
  tabWidth: 2,
  singleQuote: false,
  bracketSameLine: false,
  trailingComma: "es5",

  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindAttributes: ["className"],
};
