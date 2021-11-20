import React, {useState} from 'react';
import icon from '../../images/drag-icon.svg'
import styles from './burger-constructor.module.css'
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {
    ADD_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_INGREDIENT,
    REMOVE_CONSTRUCTOR_INGREDIENT
} from "../../services/actions/constructor-ingredients";
import {DEC_INGREDIENT_COUNT, INC_INGREDIENT_COUNT} from "../../services/actions/ingredients";
//@ts-ignore
function BurgerConstructor() {

    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    const constructor = useSelector((state: any) => state.constructorIngredients)
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
    })

    //@ts-ignore
    function orderClickHandler(){
        toggleOrderModal()
    }
    function toggleOrderModal(){
        setShowModal(!showModal)
    }

    function handleDeleteElement(item:any){
        dispatch({type:REMOVE_CONSTRUCTOR_INGREDIENT, payload: item['key']})
        dispatch({type:DEC_INGREDIENT_COUNT, payload: item['_id']})
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
                    {Array.isArray(constructor.ingredients) && constructor.ingredients.map((item:any, index:number) => {
                            return (
                                <div key={item.key} className={`${styles.innerBurgerElement} pr-2`}>
                                    <img src={icon} alt="Иконка перетаскиваемого элемента" className={styles.dragIcon}/>
                                    <ConstructorElement
                                        text={item["name"]}
                                        price={item["price"]}
                                        thumbnail={item["image"]}
                                        handleClose={() => handleDeleteElement(item)}
                                    />
                                </div>
                            )
                    })}
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
            <Modal isOpen={showModal} toggleModal={toggleOrderModal}>
                <OrderDetails/>
            </Modal>
        </div>
    );
}

export default BurgerConstructor;