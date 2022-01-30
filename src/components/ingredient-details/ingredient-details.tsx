import React, {FC} from 'react';
import styles from "./ingredient-details.module.css"
import {TIngredient} from "../../utils/constants";

interface IIngredientDetails {
    ingredient: TIngredient
}

const IngredientDetails: FC<IIngredientDetails> = ({ingredient}) => {
    return (
        <div className={`${styles.ingredientsModalBody} ingredient-details`}>
             <div className="mb-4">
                 <img src={ingredient.image_large} alt=""/>
             </div>
            <h4 className="mb-8 text text_type_main-medium">{ingredient.name}</h4>
            <div className={`${styles.composition} mb-15`}>
                <div className={styles.compositionItem}>
                    <span className=" mb-2 text text_type_main-default text_color_inactive">Калории,ккал</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.calories}</span>
                </div>
                <div className={styles.compositionItem}>
                    <span className=" mb-2 text text_type_main-default text_color_inactive">Белки, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</span>
                </div>
                <div className={styles.compositionItem}>
                    <span className=" mb-2 text text_type_main-default text_color_inactive">Жиры, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.fat}</span>
                </div>
                <div className={styles.compositionItem}>
                    <span className=" mb-2 text text_type_main-default text_color_inactive">Углеводы, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
}

export default IngredientDetails;