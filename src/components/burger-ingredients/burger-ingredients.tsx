import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css'
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {menuItemPropTypes} from "../../utils/constants";



function BurgerIngredients({data}:any) {
    const [current, setCurrent] = useState('bun')
    const [showModal, setShowModal] = useState(false)

    const [activeIngredient, setActiveIngredient] = useState({})

    //@ts-ignore
    function ingredientClickHandler(item){
        setActiveIngredient(item)
        toggleIngredientModal()
    }
    function toggleIngredientModal(){
        setShowModal(!showModal)
    }

    return (
        <div className={`${styles.ingredientsBlock}`}>
            <div className={`${styles.tabs} pb-10`}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булка
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соус
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинка
                </Tab>
            </div>
            <Modal isOpen={showModal} headerText="Детали ингредиента" toggleModal={toggleIngredientModal}>
                { /*@ts-ignore*/}
                {activeIngredient["_id"] && <IngredientDetails ingredient={activeIngredient}/>}
            </Modal>
            <div className={styles.ingredientItems}>
                <h2 className="text text_type_main-medium mb-6">Булки</h2>
                <div className={`${styles.itemsContainer} pl-4 pr-2 mb-10`}>
                    {data.map((item:any, index:number) => {
                        if(item.type === 'bun'){
                            return (
                                <div key={item['_id']} className={styles.burgerCard} onClick={() => ingredientClickHandler(item)}>
                                    <Counter count={1} size="default" />
                                    <div className="pr-4 pl-4 mb-1">
                                        <img src={item["image"]} alt={item["name"]}/>
                                    </div>
                                    <div className={`${styles.count} mb-1`}>
                                        <span className={`${styles.countText} mr-2 text text_type_digits-default`}>{item["price"]}</span>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    <div className={styles.titleContainer}>
                                        <span className="text text_type_main-default">{item.name}</span>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <h2 className="text text_type_main-medium mb-6">Соусы</h2>
                <div className={`${styles.itemsContainer} pl-4 pr-2 mb-10`}>
                    {data.map((item:any, index:number) => {
                        if(item.type === 'sauce'){
                            return (
                                <div key={item['_id']} className={styles.burgerCard} onClick={() => ingredientClickHandler(item)}>
                                    <Counter count={1} size="default" />
                                    <div className="pr-4 pl-4 mb-1">
                                        <img src={item["image"]} alt={item["name"]}/>
                                    </div>
                                    <div className={`${styles.count} mb-1`}>
                                        <span className={`${styles.countText} mr-2 text text_type_digits-default`}>{item["price"]}</span>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    <div className={styles.titleContainer}>
                                        <span className="text text_type_main-default">{item.name}</span>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <h2 className="text text_type_main-medium mb-6">Начинки</h2>
                <div className={`${styles.itemsContainer} pl-4 pr-2 mb-10`}>
                    {data.map((item:any, index:number) => {
                        if(item.type === 'main'){
                            return (
                                <div key={item['_id']} className={styles.burgerCard} onClick={() => ingredientClickHandler(item)}>
                                    <Counter count={1} size="default" />
                                    <div className="pr-4 pl-4 mb-1">
                                        <img src={item["image"]} alt={item["name"]}/>
                                    </div>
                                    <div className={`${styles.count} mb-1`}>
                                        <span className={`${styles.countText} mr-2 text text_type_digits-default`}>{item["price"]}</span>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    <div className={styles.titleContainer}>
                                        <span className="text text_type_main-default">{item.name}</span>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(menuItemPropTypes).isRequired
};

export default BurgerIngredients;