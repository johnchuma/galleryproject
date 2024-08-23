const { default: config } = require('./postcss.config.mjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme:{
    extend:{
      colors:{
        primaryColor:"#14B8A6",
        backgroundColor:"#f2f2f2",
        textColor:"#000000",
        mutedText:"#c0c0c0"
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
