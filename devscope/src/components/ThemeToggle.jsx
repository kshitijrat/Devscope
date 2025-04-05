import React from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ darkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      {darkMode ? (
        <>
          <Sun className="w-5 h-5" />
          <span>Light</span>
        </>
      ) : (
        <>
          <Moon className="w-5 h-5" />
          <span>Dark</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;