import { ThemeProvider, ThemeContext } from '../components/contexts/ThemeContext';
import { MenuProvider } from '../components/contexts/MenuContext';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Main from '../components/Main';

import styles from './Home.module.css';

const Home: React.FC = () => {
    return (
        <MenuProvider>
            <ThemeProvider>
                <ThemeContext.Consumer>
                    {({ theme }) =>
                        <div
                            className={styles.container}
                            style={{
                                background: theme.background,
                                color: theme.color
                            }}
                        >
                            <NavBar />
                            <Main />
                            <Footer />
                        </div>
                    }
                </ThemeContext.Consumer>
            </ThemeProvider>
        </MenuProvider>
    )
}

export default Home;