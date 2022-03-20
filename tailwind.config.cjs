// @ts-nocheck

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {
      colors: {
        'todo-black': '#282a36',
        'todo-gray': '#44475a',
        'todo-white': '#f8f8f2',
        'todo-slate': '#6272a4',
        'todo-cyan': '#8be9fd',
        'todo-green': '#50fa7b',
        'todo-orange': '#ffb86c',
        'todo-pink': '#ff79c6',
        'todo-purple': '#bd93f9',
        'todo-red': '#ff5555',
        'todo-yellow': '#f1fa8c'
      },
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
        serif: ['"Fredoka One"', ...defaultTheme.fontFamily.serif]
      }
    },
    container: {
      center: true
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
