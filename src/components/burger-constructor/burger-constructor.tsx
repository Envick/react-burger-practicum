import React from 'react';
import PropTypes from "prop-types";

import icon from '../../images/drag-icon.svg'
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({data}:any) {
    return (
        <div className={`${styles.burgerConstructor} burger-constructor-container pl-4`}>
            <div className={`${styles.burger} mb-10`}>
                {data[0]?.type === 'bun' && (
                    <div className="pr-4 mb-4">
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={data[0]['name']}
                            price={data[0]['price']}
                            thumbnail={data[0]["image"]}
                        />
                    </div>
                )}
                <div className={styles.innerBurgerContainer}>
                    {data.length > 1 && data[2]['type'] != 'bun' && data.slice(0, data.length-1).map((item:any) => (
                        <div key={item["_id"]} className={`${styles.innerBurgerElement} pr-2`}>
                            <img src={icon} alt="" className={styles.dragIcon}/>
                            <ConstructorElement
                                text={item["name"]}
                                price={item["price"]}
                                thumbnail={item["image"]}
                            />
                        </div>
                    ))}
                </div>
                {data[data.length - 1]?.type === 'bun' && (
                    <div className="pr-4 mt-4">
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={data[0]['name']}
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
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.array
}

export default BurgerConstructor;