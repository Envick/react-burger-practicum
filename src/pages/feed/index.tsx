import React, {FC, useEffect, useMemo} from 'react';
import styles from './feed.module.css'
import {useDispatch, useSelector} from "../../utils/hooks";
import FeedItem from "../../components/feed-item";
import {WS_FEED_CONNECTION_START} from "../../services/actions/feed";
const Feed: FC<any> = () => {

    const dispatch = useDispatch()

    const orders = useSelector(store => store.feed.orders)

    useMemo(() => {
        console.log(orders)
    }, [orders])

    useEffect(() => {
        dispatch({type: WS_FEED_CONNECTION_START})
    }, [])

    return (
        <main>
            <div className="container pt-20">
                <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
               <div className={styles.feedContent}>
                   <div className={styles.orders}>
                       {orders.map(item => (
                           <FeedItem isShowStatus={false} {...item} />
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
                   </div>
               </div>
            </div>
        </main>
    );
};

export default Feed;