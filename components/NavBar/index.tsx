import { useContext } from 'react';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { FiSun, FiMoon } from 'react-icons/fi';
import HamburguerMenu from '../menu/HamburguerMenu';

import { ThemeContext, themes } from '../contexts/ThemeContext';

import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
    const themeCtx = useContext(ThemeContext);

    return (
        <nav className={styles.navbar}>
            <HamburguerMenu />
            <div className={styles.config}>
                <Link href='/'><a className={styles.home}><AiOutlineHome /></a></Link>
                {themeCtx.theme === themes.dark
                    ? <FiMoon
                        onClick={ themeCtx.toggleTheme }
                    />
                    : <FiSun
                        onClick={ themeCtx.toggleTheme }
                    />
                }
            </div>
        </nav>
    );
};

export default NavBar;