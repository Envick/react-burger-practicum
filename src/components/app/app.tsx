import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    return (
    <div className="app">
        <AppHeader/>
        <main>
            <div className="container">
                <section className={styles.burgerSection}>
                    <h1 className="text text_type_main-large mb-5 pt-10">Соберите бургер</h1>
                    <div className={styles.burgerSectionContainer}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </DndProvider>
                    </div>
                </section>
            </div>
        </main>

    </div>
    );
}

export default App;
