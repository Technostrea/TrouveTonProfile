/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["ubuntu", "sans-serif"],
      },
      backgroundColor: ['dark'],
      textColor: ['dark'],
      boxShadow: {
        oauthBtn:
          'inset -2px -2px 8px 0px rgba(0, 0, 0, 0.25), 2px 2px 8px 0px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        auth: 'url("./assets/images/bg.avif")',
      },
    },
  },
  plugins: [],
}

