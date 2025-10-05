
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // The toggle functionality is no longer needed,
    // but we'll keep the function to avoid breaking other components.
  };

  return { theme, toggleTheme };
}
