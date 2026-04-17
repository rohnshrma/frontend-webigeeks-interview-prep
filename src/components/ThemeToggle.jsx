import React from 'react';
import { Moon, SunMedium } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function ThemeToggle() {
  const { state, dispatch } = useAppContext();
  const darkMode = state.theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
      className="ghost-chip inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold"
    >
      {darkMode ? <SunMedium size={16} /> : <Moon size={16} />}
      {darkMode ? 'Light mode' : 'Dark mode'}
    </button>
  );
}

export default ThemeToggle;
