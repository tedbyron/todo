// @ts-nocheck
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,svelte}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Avenir LT Std"', ...defaultTheme.fontFamily.sans],
        serif: ['"Baskerville URW"', ...defaultTheme.fontFamily.serif]
      }
    },
    container: {
      center: true
    }
  },
  plugins: []
}
