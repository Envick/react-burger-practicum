import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css';
import {getIngredients} from "../../services/actions/ingredients";
import {useDispatch, useSelector} from "react-redux";

function App() {
    return (
    <div className="app">
        <AppHeader/>
        <main>
            <div className="container">
                <section className={styles.burgerSection}>
                    <h1 className="text text_type_main-large mb-5 pt-10">Соберите бургер</h1>
                    <div className={styles.burgerSectionContainer}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </div>
                </section>
            </div>
        </main>

    </div>
    );
}

export default App;
