import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setIsLightMode(savedTheme === 'light');
  }, []);

  const toggleTheme = () => {
    const newIsLightMode = !isLightMode;
    setIsLightMode(newIsLightMode);
    
    if (newIsLightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <button 
      id="theme-toggle" 
      className="theme-toggle" 
      onClick={toggleTheme}
      title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {isLightMode ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;