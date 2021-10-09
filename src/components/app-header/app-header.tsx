import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'
//@ts-ignore
function AppHeader() {
    return (
        <header className={`pb-4 pt-4 ${styles.mainHeader}`}>
            <div className="container">
                <nav className={styles.mainNav}>
                    <div className={styles.menuList}>
                        <a href="/" className={`${styles.navItem} pl-5 pt-4 pr-5 pb-4`}>
                            <BurgerIcon type="primary"/>
                            <span  className="pl-2 text text_type_main-default">Конструктор</span>
                        </a>
                        <a href="/" className={`${styles.navItem} pl-5 pt-4 pr-5 pb-4`}>
                            <ListIcon type="secondary"/>
                            <span className="pl-2 text text_type_main-default text_color_inactive">Лента заказов</span>
                        </a>
                    </div>
                    <Logo/>
                    <a href="/" className={`${styles.navItem} ${styles.cabinetLink}`}>
                        <ProfileIcon type="secondary" />
                        <span className="pl-2 text text_type_main-default text_color_inactive">Личный кабинет</span>
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;