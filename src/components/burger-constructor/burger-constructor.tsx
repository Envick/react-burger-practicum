import React, {useState} from 'react';
import PropTypes from "prop-types";

import icon from '../../images/drag-icon.svg'
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {menuItemPropTypes} from "../../utils/constants";
import {useSelector} from "react-redux";
//@ts-ignore
function BurgerConstructor() {

    const [showModal, setShowModal] = useState(false)

    //@ts-ignore
    function orderClickHandler(){
        toggleOrderModal()
    }
    function toggleOrderModal(){
        setShowModal(!showModal)
    }
    const data = useSelector((state: any) => state.constructorIngredients.ingredients)
    return (
        <div className={`${styles.burgerConstructor} burger-constructor-container pl-4`}>
            <div className={`${styles.burger} mb-10`}>
                {data[0]?.type === 'bun' && (
                    <div className="pr-4 mb-4">
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={data[0]['name'] + " (верх)"}
                            price={data[0]['price']}
                            thumbnail={data[0]["image"]}
                        />
                    </div>
                )}
                <div className={styles.innerBurgerContainer}>
                    {data.length > 1 && data.slice(1).map((item:any, index:number) => {
                        if(item.type !== 'bun'){
                            return (
                                <div key={index} className={`${styles.innerBurgerElement} pr-2`}>
                                    <img src={icon} alt="Иконка перетаскиваемого элемента" className={styles.dragIcon}/>
                                    <ConstructorElement
                                        text={item["name"]}
                                        price={item["price"]}
                                        thumbnail={item["image"]}
                                    />
                                </div>
                            )
                        }
                    })}
                </div>
                {data[0]?.type === 'bun' && (
                    <div className="pr-4 mt-4">
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={data[0]['name'] + " (низ)"}
                            price={data[0]['price']}
                            thumbnail={data[0]["image"]}
                        />
                    </div>
                )}
            </div>
            <div className={`${styles.offer} pr-4`}>
                <span className={`text text_type_digits-medium mr-10 ${styles.offerPrice}`}>
                    610
                    <CurrencyIcon type="primary"/>
                </span>
                <Button onClick={orderClickHandler} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            <Modal isOpen={showModal} toggleModal={toggleOrderModal}>
                <OrderDetails/>
            </Modal>
        </div>
    );
}


export default BurgerConstructor;