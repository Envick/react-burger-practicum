import React, {FC, useMemo} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "../../utils/hooks";
import {TFeed, TIngredient} from "../../utils/constants";
import Modal from "../modal/modal";
import styles from './modal-profile-order.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IModalFeedProps{
    isOpen: boolean,
}

const ModalProfileOrder: FC<IModalFeedProps> = ({isOpen}) => {

    const {id} = useParams()

    const navigate = useNavigate()

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

    function toggleFeedModal(): void{
        navigate('/profile/orders')
    }

    return activeFeed ? (
        <Modal isOpen={isOpen} headerSize={'default'} headerText={`#${activeFeed?.number}`} toggleModal={toggleFeedModal}>
                <div>
                    <h3 className={"text text_type_main-medium mb-2"}>{activeFeed.name}</h3>
                    <span className={styles.status + " text text_type_main-small mb-15"}>
                        {
                            activeFeed.status === 'created' ? 'Создан' :
                            activeFeed.status === 'done' ? 'Выполнен' :
                            'Готовится'
                        }
                    </span>
                    <h4 className={"text text_type_main-medium mb-6"}>Состав:</h4>
                    <div className={`${styles.feedIngredients} mb-10`}>
                        {feedIngredients.map((item, index) => (
                            <div key={item._id + index} className={styles.feedIngredient}>
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
                        <span className={"text text_type_main-default text_color_inactive"}>{new Date(activeFeed.createdAt).toLocaleString()}</span>
                        <div className={`${styles.count} mb-1`}>
                            <span className={`${styles.countText} mr-2 text text_type_digits-default`}>{orderPrice}</span>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
        </Modal>
    ) : null
};

export default ModalProfileOrder;