import React, {useState} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password.module.css'
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {sendResetPasword} from "../../utils/utils";
import {useSelector} from "react-redux";


function ResetPassword() {
    const [form, setForm] = useState<{password: string, token: string}>({
        password: '',
        token: '',
    })

    const isAuth: boolean = useSelector((state:any) => state.auth.isAuth)

    const onChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const location = useLocation()

    const navigate = useNavigate()

    const onSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        sendResetPasword(form)
            .then(res => {
                if(res.success){
                    navigate('/')
                }
            })
            .catch(e => console.log(e.message))

    }
    if(isAuth || !location.state?.fromForgotPassword) return <Navigate to={"/"}/>

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