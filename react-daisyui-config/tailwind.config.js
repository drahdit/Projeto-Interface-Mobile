module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  daisyui: {
    themes: ["forest", "pastel"],
    themeRoot: 'body',
  },
  darkMode: ['selector', '[data-theme="forest"]'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
