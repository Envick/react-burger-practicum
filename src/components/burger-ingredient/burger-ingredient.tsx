import React from 'react';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {menuItemPropTypes} from "../../utils/constants";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import styles from './burger-ingredients.module.css'
const BurgerIngredient = ({item, ingredientClickHandler}:any) => {

    const [,dragRef] = useDrag({
        type: 'ingredient',
        item: item
    })

    return (
        <div ref={dragRef}  className={styles.burgerCard} onClick={() => ingredientClickHandler(item)}>
            <Counter count={item['count'] ?? 0} size="default" />
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

BurgerIngredient.propTypes = {
    item: menuItemPropTypes,
    ingredientClickHandler: PropTypes.func
}

export default BurgerIngredient;