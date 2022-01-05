import React, {FC, useCallback} from 'react';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredient} from "../../utils/constants";
import {useDrag} from "react-dnd";
import styles from './burger-ingredients.module.css'
import {useSelector} from "react-redux";

interface TBurgerIngredientProps {
    item: TIngredient,
    ingredientClickHandler: (item: TIngredient) => void
}

const BurgerIngredient: FC<TBurgerIngredientProps> = ({item, ingredientClickHandler}) => {

    const [,dragRef] = useDrag({
        type: 'ingredient',
        item: item
    })

    const constructorIngredientsState = useSelector((state:any) => state.constructorIngredients)

    const getIngredientCount = useCallback(() => {
        if(item.type === 'bun'){
            return constructorIngredientsState.bun?._id === item['_id'] ? 1 : 0
        }else{
            return constructorIngredientsState.ingredients.filter((el:TIngredient) => el['_id'] === item['_id']).length
        }
    }, [constructorIngredientsState.bun, constructorIngredientsState.ingredients])

    return (
        <div ref={dragRef}  className={styles.burgerCard} onClick={() => ingredientClickHandler(item)}>
            <Counter
                count={getIngredientCount()}
                size="default"
            />
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
    );
};

export default BurgerIngredient;