module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      width: {
        'fit-content': 'fit-content',
      },
      zIndex: {
        max: '1099',
        max_1: '1098',
        max_2: '1097',
        max_3: '1096',
        max_4: '1095',
        max_5: '1094',
        max_6: '1093',
      },
      spacing: {
        phone: '480px',
        phoneBtn: '400px',
        phoneBtnMax: '90vw',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      fontFamily: {
        display: ['Manrope'],
        body: ['Manrope'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
