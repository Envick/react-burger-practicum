import React, {useCallback, useEffect, useState} from 'react';
import styles from './profile.module.css'
import {NavLink} from "react-router-dom";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../services/actions/profile";

const Profile: React.FC = () => {
    const profile = useSelector((state:any) => state.profile.profile)

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const dispatch = useDispatch()

    const onChange = (e:any) => {
        setForm({...form,[e.target.name]: e.target.value})
    }

    const onSubmit = (e:any) => {
        e.preventDefault()
    }

    useEffect(() => {
        dispatch(getProfile())
    }, [])


    return (
        <div className={"container pt-30"}>
            <div className={styles.profileContent}>
                <div className={`${styles.aside} mr-15`}>
                    <div className={`${styles.asideMenus} mb-20`}>
                        <NavLink className={`${styles.asideLink} text text_type_main-medium`} to={"/profile"}>Профиль</NavLink>
                        <NavLink className={`${styles.asideLink} text text_type_main-medium`} to={"/profile/orders"}>История заказов</NavLink>
                        <a className={`${styles.asideLink} text text_type_main-medium`}>Выход</a>
                    </div>
                    <span className={"d-block text text_type_main-default text_color_inactive"}>
                В этом разделе вы можете
                    изменить свои персональные данные
                </span>
                </div>
                <form onSubmit={onSubmit} className={`${styles.profileOptions} main-form `}>
                    <div className="mb-6">
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={onChange}
                            icon={'EditIcon'}
                            value={form['name']}
                            name={'name'}
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            type={'text'}
                            placeholder={'Логин'}
                            onChange={onChange}
                            icon={'EditIcon'}
                            value={form['email']}
                            name={'email'}
                        />
                    </div>
                    <div className="mb-6">
                        <PasswordInput
                            onChange={onChange}
                            value={form['password']}
                            name={'password'}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <button className={`mr-5 pl-2 pt-4 pr-2 pb-4 text text_type_main-default ${styles.cancelButton}`}>
                            Отмена
                        </button>
                        <Button type="primary" size="large">
                            Сохранить
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;