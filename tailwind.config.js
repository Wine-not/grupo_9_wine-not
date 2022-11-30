/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/**/*.{html,js,ejs}",
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
