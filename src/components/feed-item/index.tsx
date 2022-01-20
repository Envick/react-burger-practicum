import React, {FC, useMemo} from 'react';
import styles from './feed-item.module.css'
import {useSelector} from "../../utils/hooks";
import {TFeed, TIngredient} from "../../utils/constants";

const FeedItem: FC<TFeed> = (feedItem) => {

    const ingredients = useSelector((state) => state.ingredients.ingredients)

    const feedIngredients: TIngredient[] = useMemo(() => {
        return ingredients.filter((ingredient: TIngredient) => feedItem.ingredients.find(orderIngredient => ingredient._id === orderIngredient))
    }, [feedItem, ingredients])
    console.log(feedIngredients)
    const renderIngredients = () => {
        return  feedIngredients.map(item => (
                    <div>
                        {item.name}
                    </div>
                ))
    }

    const calcOrderPrice = () => {

    }

    return (
        <div className={styles.feedItem}>
            <div className={styles.header}>
                <span className="text text_type_main-medium">{feedItem._id}</span>
                <span className="text text_type_main-default text_color_inactive">{feedItem.createdAt}</span>
            </div>
            <div className={styles.main}>
                <h3 className="text text_type_main-large mb-2">{feedItem.name}</h3>
                <span className="text text_type_main-small">{feedItem.status}</span>
            </div>
            <div className={styles.bottom}>
                <div className={styles.ingredients}>
                    {renderIngredients()}
                </div>

            </div>
        </div>
    );
};

export default FeedItem;