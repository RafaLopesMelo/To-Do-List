import { useState } from 'react';

import styles from './HamburguerMenu.module.css';

const HamburguerMenu = () => {
    const [ showMenu, setShowMenu ] = useState(true);

    return (
        <div className={styles.container} onClick={() => setShowMenu(prev => !prev)}>
            <div
                className={showMenu
                    ? styles.menuList
                    : `${styles.menuList} ${styles.on}`
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