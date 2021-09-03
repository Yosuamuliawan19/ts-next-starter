import React from 'react';

const ThemeContext = React.createContext({
  darkMode: 'light',
  setDarkMode: (theme) => {},
});
export default ThemeContext;
