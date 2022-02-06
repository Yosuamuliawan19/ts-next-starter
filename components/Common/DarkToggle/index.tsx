import nightwind from 'nightwind/helper';
import React from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';

function useForceUpdate() {
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}
export default function DarkToggle() {
  const forceUpdate = useForceUpdate();
  const checkDarkMode = () => {
    if (typeof window === 'undefined') return true;
    return window?.localStorage.getItem('nightwind-mode') === 'dark';
  };
  const onToggleDarkMode = (value) => {
    const body = document.body;
    if (!value) {
      body.removeAttribute('theme-mode');
    } else {
      body.setAttribute('theme-mode', 'dark');
    }
    forceUpdate();
    nightwind.enable(value);
  };

  return (
    <>
      <DarkModeToggle
        onChange={onToggleDarkMode}
        checked={checkDarkMode()}
        size={48}
      />
    </>
  );
}
