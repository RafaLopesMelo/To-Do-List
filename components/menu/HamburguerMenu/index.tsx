import styles from './HamburguerMenu.module.css';
import { MenuContext } from '../../contexts/MenuContext';
import { useContext } from 'react';

const HamburguerMenu = (props: {}) => {
    const menuCtx = useContext(MenuContext);

    return (
        <div className={styles.container} onClick={menuCtx.toggleShow}>
            <div
                className={menuCtx.showMenu
                    ? `${styles.menuList} ${styles.on}`
                    : styles.menuList
                }
            >
                <div className={styles.menuToggle}>
                    <div className={styles.one}></div>
                    <div className={styles.two}></div>
                    <div className={styles.three}></div>
                </div>
            </div>
            <h1>Just do it!</h1>
        </div>
    )
}

export default HamburguerMenu;