import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './forgot-password.module.css'
import {Link, Navigate, useNavigate} from "react-router-dom";
import {sendResetEmail} from "../../utils/utils";
import {useSelector} from "../../utils/hooks";


function ForgotPassword() {
    const [form, setForm] = useState<{email: string}>({
        email: '',
    })

    const isAuth: boolean = useSelector((state) => state.auth.isAuth)

    const onChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate()

    const onSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        sendResetEmail(form)
            .then(res => {
                if(res.success){
                    navigate('/reset-password', {state: {fromForgotPassword: true}})
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