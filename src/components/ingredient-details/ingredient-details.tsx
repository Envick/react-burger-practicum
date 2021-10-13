import React from 'react';
import PropTypes from "prop-types";

import styles from "./ingredient-details.module.css"

//@ts-ignore
function IngredientDetails({ingredient}) {
    return (
        <div className={styles.ingredientsModalBody}>
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

IngredientDetails.propTypes = {
    ingredient: PropTypes.object.isRequired
}

export default IngredientDetails;