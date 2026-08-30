
import React, { useState } from 'react';

export default function App() {
  const [theme, setTheme] = useState('success');

  // Hardcode full class names so the compiler detects them
  const themeMap = {
    success: 'bg-green-500 text-white hover:bg-green-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    warning: 'bg-yellow-500 text-black hover:bg-yellow-600',
  };

  return (
    <div className="p-8">
      <button 
        className={`px-4 py-2 rounded transition-colors ${themeMap[theme]}`}
        onClick={() => setTheme(theme === 'success' ? 'danger' : 'success')}
      >
        Toggle Alert Status
      </button>
    </div>
  );
}
