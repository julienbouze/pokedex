/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      zIndex: {
        '60': '60',
      },
      grayscale:{
        '50': '50%',
      }
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const scrollbarColors = {};
      Object.entries(theme('colors')).forEach(([colorName, color]) => {
        if (typeof color === 'object') {
          Object.entries(color).forEach(([shade, value]) => {
            scrollbarColors[`.scrollbar-thumb-${colorName}-${shade}`] = {
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: value,
                borderRadius: '9999px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: theme(`colors.${colorName}.${parseInt(shade) + 100}`, value),
              },
            };
          });
        }
      });

      addUtilities({
        '.scrollbar-custom': {
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '9999px',
          },
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--scrollbar-thumb) transparent',
        },
        ...scrollbarColors
      }, ['responsive', 'hover']);
    }
  ],
}
