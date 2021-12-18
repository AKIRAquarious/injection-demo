module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: 0,
            visibility: "hidden",
          },
          "100%": {
            opacity: 0.2,
            visibility: "visible",
          },
        },
        fadeOut: {
          "0%": {
            opacity: 0.2,
            visibility: "visible",
          },
          "100%": {
            opacity: 0,
            visibility: "hidden",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.15s ease-out forwards",
        fadeOut: "fadeOut 0.15s ease-out forwards",
      },
    },
  },
  plugins: [],
};
