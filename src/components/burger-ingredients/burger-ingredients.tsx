import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css'
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {menuItemPropTypes} from "../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";
import {SET_ACTIVE_INGREDIENT} from "../../services/actions/ingredient-details";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";



function BurgerIngredients() {
    const [current, setCurrent] = useState('bun')
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    //@ts-ignore
    function ingredientClickHandler(item){
        dispatch({type: SET_ACTIVE_INGREDIENT, payload:item})
        toggleIngredientModal()
    }
    function toggleIngredientModal(){
        setShowModal(!showModal)
    }
    const data = useSelector((store:any) => store.ingredients.ingredients)
    const ingredientDetails = useSelector((store:any) => store.ingredientDetails)
    useEffect(() => {
        dispatch(getIngredients())
    },[])

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
                {ingredientDetails["_id"] && <IngredientDetails ingredient={ingredientDetails}/>}
            </Modal>
            <div className={styles.ingredientItems}>
                <h2 className="text text_type_main-medium mb-6">Булки</h2>
                <div className={`${styles.itemsContainer} pl-4 pr-2 mb-10`}>
                    {data.map((item:any) => {
                        if(item.type === 'bun'){
                            return (
                                <BurgerIngredient key={item['_id']} item={item} ingredientClickHandler={ingredientClickHandler}/>
                            )
                        }
                    })}
                </div>
                <h2 className="text text_type_main-medium mb-6">Соусы</h2>
                <div className={`${styles.itemsContainer} pl-4 pr-2 mb-10`}>
                    {data.map((item:any) => {
                        if(item.type === 'sauce'){
                            return (
                                <BurgerIngredient key={item['_id']} item={item} ingredientClickHandler={ingredientClickHandler}/>
                            )
                        }
                    })}
                </div>
                <h2 className="text text_type_main-medium mb-6">Начинки</h2>
                <div className={`${styles.itemsContainer} pl-4 pr-2 mb-10`}>
                    {data.map((item:any) => {
                        if(item.type === 'main'){
                            return (
                                <BurgerIngredient key={item['_id']} item={item} ingredientClickHandler={ingredientClickHandler}/>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default BurgerIngredients;