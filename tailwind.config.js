/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  safelist: ['tasks', 'task'],
  theme: {
    extend: {
      width: {
        iphone: '390px',
      },
      height: {
        iphone: '844px',
      },
    },
  },
  plugins: [],
}
