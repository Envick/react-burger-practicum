import React, {useState} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password.module.css'
import {Link, Navigate, useNavigate} from "react-router-dom";
import {sendResetPasword} from "../../utils/constants";
import {useSelector} from "react-redux";


function ResetPassword() {
    const [form, setForm] = useState({
        password: '',
        token: '',
    })
    const isAuth = useSelector((state:any) => state.auth.isAuth)

    const onChange = (e:any) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate()

    const onSubmit = async (e:any) => {
        e.preventDefault()
        sendResetPasword(form)
            .then(res => {
                if(res.success){
                    navigate('/')
                }
            })
            .catch(e => console.log(e.message))

    }
    if(isAuth) return <Navigate to={"/"}/>

    return (
        <div className="container">
            <form className={`${styles.form} main-form`} onSubmit={onSubmit}>
                <h3 className={`text text_type_main-medium mb-6 ${styles.formMainText}`}>Регистрация</h3>
                <div className='mb-6'>
                    <PasswordInput onChange={onChange} value={form['password']} name={'password'} />
                </div>
                <div className='mb-6'>
                    <Input type={"text"} onChange={onChange} placeholder={"Введите код из письма"} value={form['token']} name={'token'} />
                </div>
                <div className={`${styles.buttonContainer} mb-20`}>
                    <Button type="primary" size="large">
                        Сохранить
                    </Button>
                </div>
                <div className={styles.bottomText}>
                    <span className="text text_type_main-default">
                        Вспомнили пароль?
                        <Link className={styles.formLink} to="/login"> Войти</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default ResetPassword ;