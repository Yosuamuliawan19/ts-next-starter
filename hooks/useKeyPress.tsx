import { useState, useEffect } from 'react';

export default function useMultiKeyPress() {
  const [keysPressed, setKeyPressed] = useState(new Set([]));

  function downHandler({ key }) {
    setKeyPressed(keysPressed.add(key));
  }

  const upHandler = ({ key }) => {
    keysPressed.delete(key);
    setKeyPressed(keysPressed);
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keysPressed;
}

export function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState<boolean>(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
    }

    // Remove event listeners on cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      }
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

export function areKeysPressed(keys = [], keysPressed = []) {
  const required = new Set(keys);
  for (const elem of keysPressed) {
    required.delete(elem);
  }
  return required.size === 0;
}
