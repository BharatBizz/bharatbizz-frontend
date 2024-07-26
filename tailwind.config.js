/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D9BF0', // Sky Blue
        secondary: '#F2F2F2', // Light Gray
        accent: '#F2994A', // Orange
        darkBlue: '#003366', // Dark Blue
        lightGray: '#EEEEEE', // Light Gray for subtle backgrounds
        errorRed: '#E91E63', // Error Red
        successGreen: '#4CAF50' // Success Green
      },
    },
  },
  plugins: [],
}
