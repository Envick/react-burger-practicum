import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(URL)
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                return Promise.reject(res.status)
            })
            .then(res => setData(res.data))
            .catch(e => console.log(e))
    }, [])

    return (
    <div className="app">
        <AppHeader/>
        <main>
            <div className="container">
                <section className={styles.burgerSection}>
                    <h1 className="text text_type_main-large mb-5 pt-10">Соберите бургер</h1>
                    <div className={styles.burgerSectionContainer}>
                        <BurgerIngredients data={data} />
                        <BurgerConstructor data={data}/>
                    </div>
                </section>
            </div>
        </main>

    </div>
    );
}

export default App;
