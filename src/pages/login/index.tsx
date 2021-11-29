import React, {useState} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css'
import {Link, Navigate, useLocation} from "react-router-dom";
import {login} from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";


function Login() {

    const dispatch = useDispatch()

    const isAuth = useSelector((store: any) => store.auth.isAuth)

    const state = useLocation().state;

    const [form, setForm] = useState({
        email: '',
        password: ''
    })


    const onChange = (e:any) => {
        setForm({...form,[e.target.name]: e.target.value})
    }

    const onSubmit = (e:any) => {
        e.preventDefault()
        dispatch(login(form))
    }

    if(isAuth) return  <Navigate to={ state?.from || '/' }/>
    return (
        <div className="container">
            <form className={`${styles.form} main-form`} onSubmit={onSubmit}>
                <h3 className={`text text_type_main-medium mb-6 ${styles.formMainText}`}>Вход</h3>
                <div className='mb-6'>
                    <Input onChange={onChange} type={"email"} placeholder={"Email"} value={form['email']} name={'email'} />
                </div>
                <div className="mb-6">
                    <PasswordInput onChange={onChange} value={form['password']} name={'password'} />
                </div>
                <div className={`${styles.buttonContainer} mb-20`}>
                    <Button type="primary" size="large">
                        Войти
                    </Button>
                </div>
                <div className={styles.bottomText}>
                    <span className="text text_type_main-default mb-4">
                        Вы — новый пользователь?
                        <Link className={styles.formLink} to="/register"> Зарегистрироваться</Link>
                    </span>
                    <span className="text text_type_main-default">
                        Забыли пароль?
                        <Link className={styles.formLink} to="/forgot-password"> Восстановить пароль</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default Login;