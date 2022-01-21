import React, {useEffect, useMemo} from 'react';
import styles from "../feed-item/feed-item.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "../../utils/hooks";
import {TFeed, TIngredient} from "../../utils/constants";
import {WS_ORDERS_CONNECTION_START} from "../../services/actions/profile-orders";

const ProfileOrdersItem = () => {

    const {id} = useParams()

    const dispatch = useDispatch()

    const allIngredients = useSelector((state) => state.ingredients.ingredients)

    const feed = useSelector(state => state.profileOrders.orders)

    const activeFeed = useMemo<TFeed | undefined>(() => {
        return feed.find((item:TFeed) => item._id === id)
    }, [id,feed])

    const feedIngredients: TIngredient[] = useMemo(() => {
        return allIngredients.filter((ingredient: TIngredient) => activeFeed?.ingredients.find(orderIngredient => ingredient._id === orderIngredient))
    }, [allIngredients, activeFeed])

    const orderPrice = useMemo(() => {
        return feedIngredients.reduce((acc, item) => acc += item.price, 0)
    }, [feedIngredients])

    useEffect(() => {
        dispatch({type: WS_ORDERS_CONNECTION_START})
    }, [])

    return activeFeed ? (
        <main>
            <div className={"container pt-30"}>
                <div className={styles.feedItem}>
                    <span className={"text text_type_main-default mb-5"} style={{textAlign: "center", display: 'block'}}>#{activeFeed?._id}</span>
                    <h3 className={"text text_type_main-medium mb-2"}>{activeFeed?.name}</h3>
                    <span style={{display:"block", color: activeFeed?.status === 'done' ? '#00CCCC' : 'red'}}
                          className={"text text_type_main-small mb-15"}>
                        {
                            activeFeed?.status === 'created' ? 'Создан' :
                                activeFeed?.status === 'done' ? 'Выполнен' :
                                    'Готовится'
                        }
                    </span>
                    <h4 className={"text text_type_main-medium mb-6"}>Состав:</h4>
                    <div className={`${styles.feedIngredients} mb-10`}>
                        {feedIngredients.map(item => (
                            <div className={styles.feedIngredient}>
                                <div className={styles.feedImageContainer}>
                                    <img className={styles.feedImage} src={item.image} alt=""/>
                                </div>
                                <span className={"text text_type_main-default"}>{item.name}</span>
                                <div className={`${styles.count} mb-1`}>
                                    <span className={`${styles.countText} mr-2 text text_type_digits-default`}>1 x {item["price"]}</span>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.bottom}>
                        <span className={"text text_type_main-default text_color_inactive"}>{activeFeed && new Date(activeFeed.createdAt).toLocaleString()}</span>
                        <div className={`${styles.count} mb-1`}>
                            <span className={`${styles.countText} mr-2 text text_type_digits-default`}>{orderPrice}</span>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    ): null
}

export default ProfileOrdersItem;