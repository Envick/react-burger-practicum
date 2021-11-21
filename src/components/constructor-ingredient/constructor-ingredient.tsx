import React from 'react';
import styles from "./constructor-ingredient.module.css";
import icon from "../../images/drag-icon.svg";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";

const ConstructorIngredient = ({item, handleDeleteElement}:any) => {

    const [, dragRef] = useDrag({
        item: item,
        type: 'constructorIngredient',
    })

    return (
        <div className={`${styles.innerBurgerElement} pr-2`} ref={dragRef}>
            <img src={icon} alt="Иконка перетаскиваемого элемента" className={styles.dragIcon}/>
            <ConstructorElement
                text={item["name"]}
                price={item["price"]}
                thumbnail={item["image"]}
                handleClose={() => handleDeleteElement(item)}
            />
        </div>
    );
};

export default ConstructorIngredient;