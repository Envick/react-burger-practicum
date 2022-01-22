import React from 'react';
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {useParams} from "react-router-dom";
import {useSelector} from "../../utils/hooks";
import {TIngredient} from "../../utils/constants";

function Ingredient() {

    const {id} = useParams()

    const ingredients: TIngredient[] = useSelector((state) => state.ingredients.ingredients)
    const ingredient: TIngredient | undefined = ingredients.find((item:TIngredient) => item._id === id)

    if(!ingredient) return null

    return (
        <div className={"pt-30"}>
            <h1 className="text text_type_main-large" style={{textAlign: "center"}}>Детали ингредиента</h1>
            <IngredientDetails ingredient={ingredient}/>
        </div>
    );
}

export default Ingredient;