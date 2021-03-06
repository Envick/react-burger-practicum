import React, {FC, useEffect, useMemo} from 'react';
import styles from './profile-orders.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {logout} from "../../services/actions/auth";
import {useDispatch, useSelector} from "../../utils/hooks";
import FeedItem from "../../components/feed-item";
import {WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_CONNECTION_START} from "../../services/actions/profile-orders";

const ProfileOrders: FC<any> = () => {

    const dispatch = useDispatch()

    const logOutHandler = (e:React.MouseEvent): void => {
        e.preventDefault()
        dispatch(logout({token: localStorage.getItem('refreshToken') ?? ''}))
    }

    const navigate = useNavigate()

    const orders = useSelector(store => store.profileOrders.orders)

    function feedClickHandler(id: string){
        navigate(`/profile/orders/${id}`, {state: {feedBackground: '/profile/orders'}})
    }


    useEffect(() => {
        dispatch({type: WS_ORDERS_CONNECTION_START})
        return () => {
            dispatch({type: WS_ORDERS_CONNECTION_CLOSED})
        }
    }, [])

    return (
        <main>
            <div className="container pt-30">
               <div className={styles.profileOrdersContent}>
                   <div className={`${styles.aside} mr-15`}>
                       <div className={`${styles.asideMenus} mb-20`}>
                           <NavLink className={`${styles.asideLink} text text_type_main-medium`} to={"/profile"}>Профиль</NavLink>
                           <NavLink className={`${styles.asideLink} text text_type_main-medium`} to={"/profile/orders"}>История заказов</NavLink>
                           <a href="/" onClick={logOutHandler} className={`${styles.asideLink} text text_type_main-medium`}>Выход</a>
                       </div>
                       <span className={"d-block text text_type_main-default text_color_inactive"}>
                            В этом разделе вы можете просмотреть свою историю заказов
                       </span>
                   </div>
                   <div className={styles.orders}>
                       {orders.map(item => (
                           <FeedItem key={Math.random() * 10000 + item._id} onClick={feedClickHandler} isShowStatus={true} {...item} />
                       ))}
                   </div>
               </div>
            </div>
        </main>
    );
};

export default ProfileOrders;