import React, {FC, useMemo} from 'react';
import styles from './feed-item.module.css'
import {useSelector} from "../../utils/hooks";
import {TFeed, TIngredient} from "../../utils/constants";

const FeedItem: FC<TFeed & { isShowStatus: boolean }> = ({isShowStatus, _id, name, createdAt, status, ingredients}) => {

    const allIngredients = useSelector((state) => state.ingredients.ingredients)

    const feedIngredients: TIngredient[] = useMemo(() => {
        return allIngredients.filter((ingredient: TIngredient) => ingredients.find(orderIngredient => ingredient._id === orderIngredient))
    }, [allIngredients, ingredients])

    const renderIngredients = () => {
        if(feedIngredients.length > 5){
            return  feedIngredients.slice(0, 6).map((item, index: number) => {
                if(index === 5){
                    return (
                        <div className={styles.feedMoreContainer}>
                            <div className={styles.feedImageContainer}>
                                <img className={styles.feedImage} src={item.image} alt=""/>
                            </div>
                            <span className={`${styles.count} text text_type_main-default`}>+{feedIngredients.length - 5}</span>
                        </div>
                    )
                }
                return (
                    <div className={styles.feedImageContainer}>
                        <img className={styles.feedImage} src={item.image} alt=""/>
                    </div>
                )
            })
        }
        return  feedIngredients.map(item => (
            <div className={styles.feedImageContainer}>
                <img className={styles.feedImage} src={item.image} alt=""/>
            </div>
        ))

    }

    const calcOrderPrice = () => {

    }

    return (
        <div className={styles.feedItem}>
            <div className={styles.header}>
                <span className="text text_type_main-default">#{_id}</span>
                <span className="text text_type_main-default text_color_inactive">{new Date(createdAt).toLocaleDateString()}</span>
            </div>
            <div className={styles.main}>
                <h3 className="text text_type_main-medium mb-6">{name}</h3>
                {isShowStatus && (
                    <span className="text text_type_main-small">
                        {
                            status === 'created' ? 'Создан' :
                                status === 'done' ? 'Выполнен' :
                                    'Готовится'
                        }
                    </span>
                )}
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