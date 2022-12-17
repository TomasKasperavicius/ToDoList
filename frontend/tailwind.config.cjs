/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'delete-icon': "url('./src/lib/images/deleteIcon.jfif')",
        'edit-icon': "url('./src/lib/images/editIcon.jfif')",
      }
    },
  },
  plugins: [],
}
