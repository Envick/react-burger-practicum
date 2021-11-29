import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './forgot-password.module.css'
import {Link, Navigate, useNavigate} from "react-router-dom";
import {sendResetEmail} from "../../utils/constants";
import {useSelector} from "react-redux";


function ForgotPassword() {
    const [form, setForm] = useState({
        email: '',
    })

    const isAuth = useSelector((state:any) => state.auth.isAuth)

    const onChange = (e:any) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate()

    const onSubmit = async (e:any) => {
        e.preventDefault()
        sendResetEmail(form)
            .then(res => {
                if(res.success){
                    navigate('/reset-password')
                }
            })
    }
    if(isAuth) return <Navigate to={"/"}/>

    return (
        <div className="container">
            <form className={`${styles.form} main-form`} onSubmit={onSubmit}>
                <h3 className={`text text_type_main-medium mb-6 ${styles.formMainText}`}>Регистрация</h3>
                <div className='mb-6'>
                    <Input onChange={onChange} type={"email"} placeholder={"email"} value={form['email']} name={'email'} />
                </div>
                <div className={`${styles.buttonContainer} mb-20`}>
                    <Button type="primary" size="large">
                        Восстановить
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

export default ForgotPassword;