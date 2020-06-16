import styles from './HamburguerMenu.module.css';
import { MenuContext } from '../../contexts/MenuContext';

const HamburguerMenu = (props: {}) => {
    return (
        <MenuContext.Consumer>
            {({ showMenu, toggleShow }) =>
            <div className={styles.container} onClick={toggleShow}>
                <div
                    className={showMenu
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
}
        </MenuContext.Consumer>
    )
}

export default HamburguerMenu;