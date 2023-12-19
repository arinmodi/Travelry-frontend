/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors: {
      'primary' : '#55D7F4'
    },
    extend: {
      width:{
        'input' : '325px',
        'small-input' : '250px',
        'small-con' : '30px',
        'diary' : '300px'
      },
      height:{
        'diary' : '200px',
        'icon' : '30px'
      }
    },
  },
  plugins: [],
}

