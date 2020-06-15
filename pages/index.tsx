import { ThemeProvider, ThemeContext } from '../components/ThemeContext';
import Tasks from '../components/Tasks';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import styles from './Home.module.css';

const Home: React.FC = () => {
    return (
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
                        <Tasks />
                        <Footer />
                    </div>
                }
            </ThemeContext.Consumer>
        </ThemeProvider>
    )
}

export default Home;