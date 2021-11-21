import React, {useCallback, useMemo, useState} from 'react';
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {
    ADD_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_INGREDIENT, CHANGE_CONSTRUCTOR_INGREDIENT_POSITION,
    REMOVE_CONSTRUCTOR_INGREDIENT
} from "../../services/actions/constructor-ingredients";
import {DEC_INGREDIENT_COUNT, INC_INGREDIENT_COUNT} from "../../services/actions/ingredients";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import {take_order} from "../../services/actions/order-details";
//@ts-ignore
function BurgerConstructor() {

    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    const constructor = useSelector((state: any) => state.constructorIngredients)
    const totalPrice = useMemo(() => {
        if(constructor.bun){
            return constructor.bun.price * 2 + constructor.ingredients.reduce((acc:number, item:any) => acc+=item.price, 0)
        }
        else{
            return constructor.ingredients.reduce((acc:number, item:any) => acc+=item.price, 0)
        }
    }, [constructor.bun, constructor.ingredients])
//@ts-ignore
    const [{isHover},dropRef] = useDrop({
        accept: 'ingredient',
        drop(item:any){
            if(item.type !== 'bun'){
                dispatch({type: ADD_CONSTRUCTOR_INGREDIENT, payload:item})
                dispatch({type: INC_INGREDIENT_COUNT, payload: item['_id']})
            }
            else{
                if(constructor.bun && constructor['bun']['_id'] !== item['_id']){
                    dispatch({type: DEC_INGREDIENT_COUNT, payload: constructor['bun']['_id']})
                }
                else if(constructor.bun && constructor['bun']['_id'] === item['_id']){
                    return
                }
                dispatch({type: ADD_CONSTRUCTOR_BUN, payload: item})
                dispatch({type: INC_INGREDIENT_COUNT, payload: item['_id']})
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    }, [constructor.ingredients])
    const moveIngredient = useCallback((dragIndex, hoverIndex) => {
        dispatch({type: CHANGE_CONSTRUCTOR_INGREDIENT_POSITION, payload:{dragIndex, hoverIndex}})
    }, [dispatch]);
    //@ts-ignore
    function orderClickHandler(){
        let data = constructor.ingredients.reduce((acc:any, item:any) => {
            return [...acc, item['_id']]
        }, [])
        dispatch(take_order({ingredients: data}, toggleOrderModal))
    }
    function toggleOrderModal(){
        setShowModal(!showModal)
    }

    function handleDeleteElement(item:any){
        dispatch({type:REMOVE_CONSTRUCTOR_INGREDIENT, payload: item['key']})
        dispatch({type:DEC_INGREDIENT_COUNT, payload: item['_id']})
    }
    function renderIngredients(item:any, index:number){
        return (
            <ConstructorIngredient key={item.key} item={item} index={index} moveIngredient={moveIngredient} handleDeleteElement={handleDeleteElement} />
        )
    }
    let border = isHover ? '2px solid #4c4cff' : ''

    return (
        <div style={{border}} className={`${styles.burgerConstructor} burger-constructor-container pl-4`} ref={dropRef}>
            <div className={`${styles.burger} mb-10`}>
                {constructor.bun && (
                    <div className="pr-4 mb-4">
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={constructor.bun['name'] + " (верх)"}
                            price={constructor.bun['price']}
                            thumbnail={constructor.bun["image"]}
                        />
                    </div>
                )}
                <div className={styles.innerBurgerContainer}>
                    {constructor.ingredients.map((item:any, index:number) => (
                        renderIngredients(item, index)
                    ))}
                </div>
                {constructor.bun && (
                    <div className="pr-4 mt-4">
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={constructor.bun['name'] + " (низ)"}
                            price={constructor.bun['price']}
                            thumbnail={constructor.bun["image"]}
                        />
                    </div>
                )}
            </div>
            {Boolean(constructor.bun || constructor.ingredients.length) && (
                <div className={`${styles.offer} pr-4`}>
                    <span className={`text text_type_digits-medium mr-10 ${styles.offerPrice}`}>
                        {totalPrice}
                        <CurrencyIcon type="primary"/>
                    </span>
                    <Button onClick={orderClickHandler} type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            )}
            <Modal isOpen={showModal} toggleModal={toggleOrderModal}>
                <OrderDetails/>
            </Modal>
        </div>
    );
}

export default BurgerConstructor;