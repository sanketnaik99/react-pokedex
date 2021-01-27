module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ["Playfair Display"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
