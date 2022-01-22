import React, {FC, useEffect} from 'react';
import styles from './feed.module.css'
import {useDispatch, useSelector} from "../../utils/hooks";
import FeedItem from "../../components/feed-item";
import {useNavigate} from "react-router-dom";
import {WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START} from "../../services/actions/feed";
import {TAppDispatch} from "../../utils/constants";

const Feed: FC<any> = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {orders, totalSum, totalTodaySum} = useSelector(store => store.feed)

    function feedClickHandler(id: string){
        navigate(`/feed/${id}`, {state: {feedBackground: '/feed'}})
    }

    useEffect(() => {
        dispatch({type: WS_FEED_CONNECTION_START})
        return () => {
            dispatch({type: WS_FEED_CONNECTION_CLOSED})
        }
    }, [])

    return (
        <main>
            <div className="container pt-20">
                <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
               <div className={styles.feedContent}>
                   <div className={styles.orders}>
                       {orders.map(item => (
                           <FeedItem key={item._id + Math.random() * 10000} onClick={feedClickHandler} isShowStatus={false} {...item} />
                       ))}
                   </div>
                   <div className={styles.feedInfo}>
                        <div className={styles.feedReadiness}>
                            <div className={styles.feedReady}>
                                <span className="text text_type_main-medium mb-6">Готовы:</span>
                                {orders.filter(item => item.status === 'done').slice(0, 5).map(item => (
                                    <span key={item._id + Math.random() * 10000} style={{color: '#00CCCC'}} className="text text_type_main-default">{item.number}</span>
                                ))}
                            </div>
                            <div className={styles.feedPending}>
                                <span className="text text_type_main-medium mb-6">В работе:</span>
                                {orders.filter(item => item.status === 'pending').slice(0, 5).map(item => (
                                    <span key={item._id + Math.random() * 10000} style={{color: '#00CCCC'}} className="text text_type_main-default">{item.number}</span>
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