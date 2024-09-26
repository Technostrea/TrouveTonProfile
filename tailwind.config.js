/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
      boxShadow: {
        oauthBtn:
          'inset -2px -2px 8px 0px rgba(0, 0, 0, 0.25), 2px 2px 8px 0px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        auth: 'url("https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      },
    },
  },
  plugins: [],
}

