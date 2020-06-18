import { useState, createContext, useEffect } from "react";

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
    toggleTheme: () => { }
});

const ThemeProvider: React.FC = (props) => {

    const [theme, setTheme] = useState(themes.light);

    useEffect(() => {
        const defaultTheme = localStorage.getItem('theme');
        if (defaultTheme){
            defaultTheme == 'dark'
                ? setTheme(themes.dark)
                : setTheme(themes.light)
        }
    }, []);

    function toggleTheme() {
        if(theme === themes.light) {
            setTheme(themes.dark)
            localStorage.setItem('theme', 'dark')
        } else {
            setTheme(themes.light)
            localStorage.setItem('theme', 'light')
        }
    }


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext, themes };