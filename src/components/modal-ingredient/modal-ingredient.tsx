import React, {useMemo, useState} from 'react';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import PropTypes from "prop-types";

function ModalIngredient({isOpen}:any) {
    const {id} = useParams()
    const ingredients = useSelector((state:any) => state.ingredients.ingredients)
    const activeIngredient = useMemo(() => {
        return ingredients.find((item:any) => item.id === id)
    }, [ingredients])
    const navigate = useNavigate()
    function toggleIngredientModal(){
        navigate('/')
    }

    return (
        <Modal isOpen={isOpen} headerText="Детали ингредиента" toggleModal={toggleIngredientModal}>
            { /*@ts-ignore*/}
            {activeIngredient && <IngredientDetails ingredient={activeIngredient}/>}
        </Modal>
    );
}

ModalIngredient.propTypes = {
    isOpen: PropTypes.bool
}
export default ModalIngredient;