/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ejs}",
    "./views/*.ejs",
  ],
  theme: {
    extend: {
      fontSize: {
        '15xl': '15rem',
      }
    },
  },
  plugins: [],
}
