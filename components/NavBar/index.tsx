import { MdSettings } from 'react-icons/md';
import { FiSun, FiMoon } from 'react-icons/fi';
import HamburguerMenu from '../HamburguerMenu';

import { ThemeContext, themes } from '../ThemeContext';

import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) =>
                <nav className={styles.navbar}>
                    <HamburguerMenu />
                    <div className={styles.config}>
                        <MdSettings />
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