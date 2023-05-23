/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
      "./node_modules/flowbite/**/*.js",
  
  ],
  theme: {
    extend: {
      rounded:{
        '4xl': '50px',
      },
      fontFamily: {
        'verdana': ['verdana'],
        'verdana-bold' : ['verdana-bold'],
        'verdana-bold-italic' : ['verdana-bold-italic']
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}