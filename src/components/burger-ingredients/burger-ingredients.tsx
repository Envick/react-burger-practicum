import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";



function BurgerIngredients({data}:any) {
    const [current, setCurrent] = useState('bun')
    const [buns, setBuns] = useState([])
    const [sauses, setSauses] = useState([])
    const [mains, setMains] = useState([])
    data.forEach((item:Object) => {
        //@ts-ignore
        switch(item.type){
            case 'bun':
                //@ts-ignore
                setBuns(prev => [...prev, item])
                break
            case 'sause':
                //@ts-ignore
                setSauses(prev => [...prev, item])
                break
            case 'main':
                //@ts-ignore
                setMains(prev => [...prev, item])
                break
        }
    })
    return (
        <div className={`${styles.ingredientsBlock} pt-10`}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={`${styles.tabs} pb-10`}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булка
                </Tab>
                <Tab value="sause" active={current === 'sause'} onClick={setCurrent}>
                    Соус
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинка
                </Tab>
            </div>
            <div className={styles.ingredientItems}>
                <h2 className="text text_type_main-medium">Булки</h2>
                {buns.length && buns.map(item => (
                    <div className={styles.burgerCard}>

                    </div>
                ))}
                <h2 className="text text_type_main-medium">Соусы</h2>
                <h2 className="text text_type_main-medium">Начинки</h2>
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.array
};

export default BurgerIngredients;