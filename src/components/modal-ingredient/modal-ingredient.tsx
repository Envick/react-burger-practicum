import React, {FC, useMemo} from 'react';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useSelector} from "../../utils/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {TIngredient} from "../../utils/constants";

interface IModalIngredientProps{
    isOpen: boolean
}

const ModalIngredient: FC<IModalIngredientProps> = ({isOpen}) => {

    const {id} = useParams()

    const ingredients = useSelector((state:any) => state.ingredients.ingredients)

    const activeIngredient = useMemo<TIngredient>(() => {
        return ingredients.find((item:TIngredient) => item._id === id)
    }, [id,ingredients])

    const navigate = useNavigate()

    function toggleIngredientModal(): void{
        navigate('/')
    }

    return (
        <Modal isOpen={isOpen} headerText="Детали ингредиента" toggleModal={toggleIngredientModal}>
            {activeIngredient && <IngredientDetails ingredient={activeIngredient}/>}
        </Modal>
    );
}

export default ModalIngredient;