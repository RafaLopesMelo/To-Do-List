import styles from './Footer.module.css';
import {
    FiTwitter,
    FiInstagram,
    FiLinkedin,
} from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className={styles.footerbar}>
                <a href="https://twitter.com/RafaScriptMelo" target="blanck"><FiTwitter /></a>
                <a href="https://www.instagram.com/rafa.lopesmelo/" target="blanck"><FiInstagram /></a>
                <a href="https://www.linkedin.com/in/rafael-melo-4506a81a5/" target="blanck"><FiLinkedin /></a>
        </footer>
    )
}

export default Footer;