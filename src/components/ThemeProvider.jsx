import React, { useState } from 'react';
import { ThemeContext } from '../store/ThemeContext';

const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const toggleTheme = () => {
   setIsDarkTheme(prevTheme => !prevTheme);
 };
    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;

