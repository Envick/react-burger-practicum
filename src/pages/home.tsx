import React from 'react';
import styles from "../components/app/app.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

function Home() {
    return (
        <main>
            <div className="container">
                <section>
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
    );
}

export default Home;