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
    REMOVE_CONSTRUCTOR_INGREDIENT, REPLACE_CONSTRUCTOR_BUN
} from "../../services/actions/constructor-ingredients";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import {takeOrder} from "../../services/actions/order-details";
import {useNavigate} from "react-router-dom";
import {TIngredient} from "../../utils/constants";

function BurgerConstructor() {

    const [showModal, setShowModal] = useState<boolean>(false)

    const isAuth: boolean = useSelector((store: any) => store.auth.isAuth)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const burgerConstructorState = useSelector((state: any) => state.constructorIngredients)

    const totalPrice = useMemo<number>(() => {
        return burgerConstructorState.ingredients.reduce((acc:number, item:any) => acc+=item.price, 0) + (burgerConstructorState?.bun?.price * 2 || 0)
    }, [burgerConstructorState.bun, burgerConstructorState.ingredients])

    const [{isHover},dropRef] = useDrop({
        accept: 'ingredient',
        drop(item:any){
            if(item.type !== 'bun'){
                dispatch({type: ADD_CONSTRUCTOR_INGREDIENT, payload:item})
            }
            else{
                dispatch({
                    type: (burgerConstructorState.bun ? REPLACE_CONSTRUCTOR_BUN : ADD_CONSTRUCTOR_BUN),
                    payload: item
                })
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    }, [burgerConstructorState.ingredients])

    const moveIngredient = useCallback((dragIndex, hoverIndex) => {
        dispatch({type: CHANGE_CONSTRUCTOR_INGREDIENT_POSITION, payload:{dragIndex, hoverIndex}})
    }, [dispatch]);

    //@ts-ignore
    function orderClickHandler(): void{
        if(isAuth){
            const burgerOrder: string[] = burgerConstructorState.ingredients.reduce((acc:any, item:any) => {
                return [...acc, item['_id']]
            }, [])
            dispatch(takeOrder({ingredients: burgerOrder}, toggleOrderModal))
        }
        else{
            navigate('/login')
        }
    }

    function toggleOrderModal(): void{
        setShowModal(!showModal)
    }

    function handleDeleteElement(item:TIngredient): void{
        dispatch({type:REMOVE_CONSTRUCTOR_INGREDIENT, payload: item['key']})
    }
    function renderIngredients(item:TIngredient, index:number){
        return (
            <ConstructorIngredient key={item.key} item={item} index={index} moveIngredient={moveIngredient} handleDeleteElement={handleDeleteElement} />
        )
    }

    const border = isHover ? '2px solid #4c4cff' : ''

    return (
        <div style={{border}} className={`${styles.burgerConstructor} burger-constructor-container pl-4`} ref={dropRef}>
            <div className={`${styles.burger} mb-10`}>
                {burgerConstructorState.bun && (
                    <div className="pr-4 mb-4">
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={burgerConstructorState.bun['name'] + " (верх)"}
                            price={burgerConstructorState.bun['price']}
                            thumbnail={burgerConstructorState.bun["image"]}
                        />
                    </div>
                )}
                <div className={styles.innerBurgerContainer}>
                    {burgerConstructorState.ingredients.map((item:TIngredient, index:number) => (
                        renderIngredients(item, index)
                    ))}
                </div>
                {burgerConstructorState.bun && (
                    <div className="pr-4 mt-4">
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={burgerConstructorState.bun['name'] + " (низ)"}
                            price={burgerConstructorState.bun['price']}
                            thumbnail={burgerConstructorState.bun["image"]}
                        />
                    </div>
                )}
            </div>
            {Boolean(burgerConstructorState.bun || burgerConstructorState.ingredients.length) && (
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