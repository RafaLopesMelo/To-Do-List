import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { FiSun, FiMoon } from 'react-icons/fi';
import HamburguerMenu from '../menu/HamburguerMenu';

import { ThemeContext, themes } from '../contexts/ThemeContext';

import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) =>
                <nav className={styles.navbar}>
                    <HamburguerMenu />
                    <div className={styles.config}>
                        <Link href='/'><a className={styles.home}><AiOutlineHome /></a></Link>
                        {theme === themes.dark
                            ? <FiMoon
                                onClick={toggleTheme}
                            />
                            : <FiSun
                                onClick={toggleTheme}
                            />
                        }
                    </div>
                </nav>
            }
        </ThemeContext.Consumer >
    );
};

export default NavBar;