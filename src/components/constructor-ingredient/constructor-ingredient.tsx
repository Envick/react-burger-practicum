import React, {FC, useRef} from 'react';
import styles from "./constructor-ingredient.module.css";
import icon from "../../images/drag-icon.svg";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {TClientRect, TIngredient} from "../../utils/constants";

interface IConstructorIngredientProps {
    item: TIngredient,
    handleDeleteElement: (item: TIngredient) => void,
    index: number,
    moveIngredient: (dragIndex: number, hoverIndex: number) => void
}

const ConstructorIngredient: FC<IConstructorIngredientProps> = ({item, handleDeleteElement, index, moveIngredient}) => {

    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
        accept: 'constructorIngredient',
        hover: function (item: any, monitor: any) {
            if (!ref.current) {
                return;
            }
            const dragIndex: number = item.index;
            const hoverIndex: number = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect: TClientRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY: number = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset : {x: number, y:number} = monitor.getClientOffset();
            const hoverClientY: number = clientOffset.y - hoverBoundingRect.top;
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

export default ConstructorIngredient;