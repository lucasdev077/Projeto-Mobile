import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  const toggleTheme = () => {
    setIsDark(!isDark);
  };
 
  const lightColors = {
    background: '#fff',
    text: '#000',
    primary: '#ff6600',     
    menuBackground: '#fff',  
    menuText: '#000',
  };

  const darkColors = {
    background: '#121212',
    text: '#fff',
    primary: '#ff5500',     
    menuBackground: '#222',  
    menuText: '#fff',
  };

  const colors = isDark ? darkColors : lightColors;

  const theme = {
    isDark,
    toggleTheme,
    colors,
  };
 
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === 'dark');
    });
    return () => subscription.remove();
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
