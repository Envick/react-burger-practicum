import React, {useRef} from 'react';
import styles from "./constructor-ingredient.module.css";
import icon from "../../images/drag-icon.svg";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {menuItemPropTypes} from "../../utils/constants";
import PropTypes from "prop-types";

const ConstructorIngredient = ({item, handleDeleteElement, index, moveIngredient}:any) => {

    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: 'constructorIngredient',
        hover(item:any, monitor:any) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            //@ts-ignore
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [, drag] = useDrag({
        type: 'constructorIngredient',
        item: () => {
            return {...item, index}
        },
    });
    drag(drop(ref));
    return (
        <div className={`${styles.innerBurgerElement} pr-2`} ref={ref}>
            <img src={icon} alt="Иконка перетаскиваемого элемента" className={styles.dragIcon}/>
            <ConstructorElement
                text={item["name"]}
                price={item["price"]}
                thumbnail={item["image"]}
                handleClose={() => handleDeleteElement(item)}
            />
        </div>
    );
};

ConstructorIngredient.propTypes = {
    item: menuItemPropTypes,
    index: PropTypes.number,
    handleDeleteElement: PropTypes.func,
    moveIngredient: PropTypes.func
}

export default ConstructorIngredient;