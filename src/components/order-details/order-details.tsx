import React from 'react';

import styles from './order-details.module.css'

import doneImg from '../../images/done.png'
import {useSelector} from "../../utils/hooks";

function OrderDetails() {
    const orderDetails = useSelector((state: any) => state.orderDetails.orderDetails)

    return (
        <div className={`${styles.orderDetails} pt-4`}>
            <h2 className="text text_type_digits-large mb-8">{orderDetails?.order?.number}</h2>
            <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
            <img className="mb-15" src={doneImg} alt=""/>
            <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
            <span className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</span>
        </div>
    );
}

export default OrderDetails;