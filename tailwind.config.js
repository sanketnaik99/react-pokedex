module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        normal: {
          start: "#6782B4",
          end: "#B1BFD8",
        },
        fighting: {
          start: "#EE6C4D",
          end: "#61210F",
        },
        flying: {
          start: "#09C6F9",
          end: "#045DE9",
        },
        fire: {
          start: "#F53803",
          end: "#F5D020",
        },
        water: {
          start: "#48A9FE",
          end: "#0BEEF9",
        },
        grass: {
          start: "#A2D240",
          end: "#1B8B00",
        },
        poison: {
          start: "#CB218E",
          end: "#6617CB",
        },
        ground: {
          start: "#AD6F69",
          end: "#43302E",
        },
        rock: {
          start: "#96705B",
          end: "#BA9A8E",
        },
        electric: {
          start: "#FFDD00",
          end: "#FBB034",
        },
        psychic: {
          start: "#EF6DA0",
          end: "#EE8E6B",
        },
        ice: {
          start: "#B2FEFA",
          end: "#0ED2F7",
        },
        bug: {
          start: "#98DE5B",
          end: "#08E1AE",
        },
        ghost: {
          start: "#C373F2",
          end: "#F977CE",
        },
        steel: {
          start: "#09203F",
          end: "#537895",
        },
        dragon: {
          start: "#37D5D6",
          end: "#36096D",
        },
        dark: {
          start: "#000000",
          end: "#633CB5",
        },
        fairy: {
          start: "#F08EFC",
          end: "#EE5166",
        },
      },
      fontFamily: {
        body: ["Playfair Display"],
        sans: ["Poppins"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
