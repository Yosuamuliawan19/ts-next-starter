module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  // mode: 'jit',
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
      colors: {
        blue: {
          light: '#85d7ff',
          DEFAULT: '#1fb6ff',
          dark: '#009eeb',
        },
        pastel: 'rgb(221, 243, 245)',
        'indigo-dark': '#202e78',
        'red-btn': '#C25151',
        'red-btn-bg': '#E9C1C1',
        'red-btn-hover': '#EECDCD',
        'link-hover': 'rgba(0,0,0,0.05)',
        glassSm: 'rgba(255,255,255,0.98)',
        glassSmDark: 'rgba(0,0,0,0.98)',
        glassMd: 'rgba(0,0,0,0)',
        glassMdDark: 'rgba(0,0,0,0)',

        gray750: '#262d38',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
    },
    fontFamily: {
      // display: ['Montserrat'],
      display: ['Inter'],
      body: ['Inter'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
