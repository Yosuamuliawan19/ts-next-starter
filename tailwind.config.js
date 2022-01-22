module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  mode: 'jit',
  theme: {
    nightwind: {
      colors: {
        white: '#191b1c',
        black: '#ffffff',
        gray: {
          100: '#202224',
        },
        green: {
          100: '#1b3527', // or 'blue.900'
          500: '#60cd66', // or 'blue.500'
        },

        yellow: {
          100: '#584601', // or 'blue.500'
          500: '#ffa054', // or 'blue.900'
        },
        primary: 'var(--secondary)',
        secondary: 'var(--primary)',
      },
    },
    extend: {
      colors: {
        green: {
          100: '#e4f1e8', // or 'blue.900'
          500: '#14a01d', // or 'blue.500'
        },
        yellow: {
          100: '#fef3c7', // or 'blue.900'
          500: '#b45309', // or 'blue.500'
        },
      },
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
  plugins: [require('nightwind')],
};
