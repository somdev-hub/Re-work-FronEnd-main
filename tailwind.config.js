const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { min: "200px", max: "639px" },
        // => @media (min-width: 375px) { ... }

        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "769px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": { min: "1536px", max: "1920px" },
        // => @media (min-width: 1536px) { ... }
        "3xl": "1920px",
        // => @media (min-width: 1920px) { ... }
        mobile: "200px",
        tablet: "768px",
        laptop: "1280px"
      },
      boxShadow: {
        "2xl": "0px 0px 8px 0px rgba(92, 39, 192, 0.40)",
        "3xl": "0px 0px 16px 0px rgba(0, 10, 103, 0.16);"
      },

      fontFamily: {
        "gilroy-light": ["GilroyLight", "sans-serif"],
        "gilroy-extrabold": ["GilroyExtraBold", "sans-serif"],
        "gilroy-bold": ["GilroyBold", "sans-serif"],
        "gilroy-semi-bold": ["GilroySemiBold", "sans-serif"],
        "gilroy-regular": ["GilroyRegular", "sans-serif"],
        "gilroy-thin": ["GilroyThin", "sans-serif"],
        "gilroy-medium": ["GilroyMedium", "sans-serif"],
        "gilroy-heavy": ["GilroyHeavy", "sans-serif"],
        "gilroy-black": ["GilroyBlack", "sans-serif"],
        "gilroy-ultra-light": ["GilroyUltraLight", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        "quicksand-medium": ["Quicksand-Medium", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        actor: ["Actor", "sans-serif"],
        "garnett-regular": ["GarnettRegular", "sans-serif"],
        "garnett-bold": ["GarnettBold", "sans-serif"],
        "garnett-medium": ["GarnettMedium", "sans-serif"],
        "garnett-semi-bold": ["GarnettSemiBold", "sans-serif"],
        "garnett-medium-italic": ["GarnettMediumItalic", "sans-serif"],
        "space-grotesk": ['Space Grotesk', "sans-serif"],
      }
    }
  },
  plugins: [
    require("postcss-import")({
      plugins: [],
      path: ["./node_modules"]
    }),
    require("tailwindcss")("./tailwind.config.js"),
    require("postcss-preset-env")({
      autoprefixer: {},
      features: {
        "nesting-rules": true
      }
    })
  ]
});
