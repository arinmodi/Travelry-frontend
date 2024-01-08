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
        'input' : '50vw',
        'small-input' : '250px',
        'small-con' : '30px',
        'diary' : '300px',
        'more': '180px',
        'diary-skeleton' : '320px',
        'media-skeleton' : '22.5rem'
      },
      height:{
        'diary' : '200px',
        'icon' : '30px',
        'media-skeleton' : '15rem'
      },
      gradientColorStops: theme => ({
        'from':"#000099",
        'to':"#99ccff"
      })
    },
  },
  plugins: [],
}

