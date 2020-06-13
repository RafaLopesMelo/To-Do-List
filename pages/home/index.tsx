import { useState } from 'react';
import Switch from 'react-switch';
import { MdSettings } from 'react-icons/md';
import {
    FiTwitter,
    FiInstagram,
    FiLinkedin,
} from 'react-icons/fi';

import styles from './Home.module.css';

import Tasks from '../../components/Tasks';
import HamburguerMenu from '../../components/HamburguerMenu';

export default function Home() {
    const [isDark, setIsDark] = useState(false);
    

    return (
        <div
            style={
                isDark
                    ? { backgroundColor: "#443c70", color: "#fefefe" }
                    : { backgroundColor: "#fefefe", color: "#303a52" }
            }
            className={styles.container}
        >
            <nav className={styles.navbar}>       
                    <HamburguerMenu/>
                <div className={styles.config}>
                    <MdSettings size={50} />
                    <Switch
                        onChange={() => setIsDark(prev => !prev)}
                        checked={isDark}
                        onColor="#fc5185"
                        offColor="#9e579d"
                    />
                </div>
            </nav>

            <Tasks isDark={isDark}/>

            <footer className={styles.footerbar}>
                <div>
                    <a href="https://twitter.com/RafaScriptMelo" target="blanck"><FiTwitter /></a>
                    <a href="https://www.instagram.com/rafa.lopesmelo/" target="blanck"><FiInstagram /></a>
                    <a href="https://www.linkedin.com/in/rafael-melo-4506a81a5/" target="blanck"><FiLinkedin /></a>
                </div>
            </footer>
        </div>
    )
}