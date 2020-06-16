import { useState, createContext } from "react";

const themes = {
    light: {
        background: '#fefefe',
        color: '#303A52',
        borderColor: 'rgba(0,0,0,0.2)',
        boxShadow: '5px 5px 5px rgba(0,0,0,0.2)'
    },
    dark: {
        background: '#443c70',
        color: '#fefefe',
        borderColor: 'rgba(255,255,255,0.2)',
        boxShadow: '5px 5px 5px rgba(255,255,255,0.2)'
    }
}

const ThemeContext = createContext({
    theme: themes.light,
    toggleTheme: () => {}
});

const ThemeProvider: React.FC = (props) => {
    const [ theme, setTheme ] = useState(themes.light);

    function toggleTheme() {
        theme === themes.light
            ? setTheme(themes.dark)
            : setTheme(themes.light)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export {ThemeProvider, ThemeContext, themes};