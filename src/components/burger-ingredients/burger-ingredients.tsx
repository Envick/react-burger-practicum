import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {SET_ACTIVE_INGREDIENT} from "../../services/actions/ingredient-details";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {useNavigate} from "react-router-dom";
import {TIngredient} from "../../utils/constants";

function BurgerIngredients() {
    const [current, setCurrent] = useState<string>('bun')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const ingredientsRef = useRef<HTMLDivElement>(null)

    function ingredientClickHandler(item: TIngredient){
        dispatch({type: SET_ACTIVE_INGREDIENT, payload:item})
        navigate(`/ingredients/${item._id}`, {state: {background: '/'}})
    }

    const ingredients = useSelector((store:any) => store.ingredients.ingredients)
    
    const scrollHandler = useCallback(() => {
        let containerTopMargin: number = ingredientsRef?.current?.getBoundingClientRect()?.top ?? 0
        let position = containerTopMargin;
        let closer = ''
        document.querySelectorAll('.ingredient-text').forEach(item => {
            let elHeight = item.getBoundingClientRect().top
            let topPosition = Math.abs(containerTopMargin - elHeight)
            if(topPosition < position){
                position = topPosition
                closer = item.id
            }
        })
        if(closer){
            setCurrent(closer)
        }
    }, [])
    useEffect(() => {
        ingredientsRef?.current?.addEventListener('scroll', scrollHandler)
        return () => {
            ingredientsRef?.current?.removeEventListener('scroll', scrollHandler)
        }
    },[dispatch, scrollHandler])

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

            <div className={styles.ingredientItems} ref={ingredientsRef}>
                <h2 className="text text_type_main-medium mb-6 ingredient-text" id="bun">Булки</h2>
                <div className={`${styles.itemsContainer} pl-4 pr-2 mb-10`}>
                    {ingredients.map((item:TIngredient) => {
                        if(item.type === 'bun'){
                            return (
                                <BurgerIngredient key={item['_id']} item={item} ingredientClickHandler={ingredientClickHandler}/>
                            )
                        }
                    })}
                </div>
                <h2 className="text text_type_main-medium mb-6 ingredient-text" id="sauce">Соусы</h2>
                <div className={`${styles.itemsContainer} pl-4 pr-2 mb-10`}>
                    {ingredients.map((item:TIngredient) => {
                        if(item.type === 'sauce'){
                            return (
                                <BurgerIngredient key={item['_id']} item={item} ingredientClickHandler={ingredientClickHandler}/>
                            )
                        }
                    })}
                </div>
                <h2 className="text text_type_main-medium mb-6 ingredient-text" id="main">Начинки</h2>
                <div className={`${styles.itemsContainer} pl-4 pr-2 mb-10`}>
                    {ingredients.map((item:TIngredient) => {
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