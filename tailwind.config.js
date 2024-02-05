/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './src/**/*.{html,js,jsx,ts,tsx}',
    // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#005643',
        customBg:"#F5F4F4",
        customWhite:"#fff"
      
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}
