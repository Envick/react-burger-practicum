import React, {FC, useEffect, useMemo} from 'react';
import styles from './feed.module.css'
import {useDispatch, useSelector} from "../../utils/hooks";
import FeedItem from "../../components/feed-item";
import {WS_FEED_CONNECTION_START} from "../../services/actions/feed";
import {TFeed, TIngredient} from "../../utils/constants";
import {SET_ACTIVE_INGREDIENT} from "../../services/actions/ingredient-details";
import {useNavigate} from "react-router-dom";
const Feed: FC<any> = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {orders, totalSum, totalTodaySum} = useSelector(store => store.feed)

    function feedClickHandler(id: string){
        navigate(`/feed/${id}`, {state: {feedBackground: '/feed'}})
    }

    useMemo(() => {
        console.log(orders)
    }, [orders])


    return (
        <main>
            <div className="container pt-20">
                <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
               <div className={styles.feedContent}>
                   <div className={styles.orders}>
                       {orders.map(item => (
                           <FeedItem onClick={feedClickHandler} isShowStatus={false} {...item} />
                       ))}
                   </div>
                   <div className={styles.feedInfo}>
                        <div className={styles.feedReadiness}>
                            <div className={styles.feedReady}>
                                <span className="text text_type_main-medium mb-6">Готовы:</span>
                                {orders.filter(item => item.status === 'done').slice(0, 5).map(item => (
                                    <span style={{color: '#00CCCC'}} className="text text_type_main-default">{item._id}</span>
                                ))}
                            </div>
                            <div className={styles.feedPending}>
                                <span className="text text_type_main-medium mb-6">В работе:</span>
                                {orders.filter(item => item.status === 'зутвштп').slice(0, 5).map(item => (
                                    <span style={{color: '#00CCCC'}} className="text text_type_main-default">{item._id}</span>
                                ))}
                            </div>
                        </div>
                       <span style={{display: 'block'}} className={"text text_type_main-medium"}>Выполнено за все время:</span>
                       <span style={{display: 'block'}} className={"text text_type_digits-large mb-15"}>{totalSum}</span>
                       <span style={{display: 'block'}} className={"text text_type_main-medium"}>Выполнено за сегодня:</span>
                       <span style={{display: 'block'}} className={"text text_type_digits-large mb-15"}>{totalTodaySum}</span>
                   </div>
               </div>
            </div>
        </main>
    );
};

export default Feed;