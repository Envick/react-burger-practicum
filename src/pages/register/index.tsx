import React, {useState} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register.module.css'
import {Link, Navigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../services/actions/auth";


function Register() {
    const dispatch = useDispatch()

    const isAuth: boolean = useSelector((store: any) => store.auth.isAuth)

    const state = useLocation().state;

    const [form, setForm] = useState<{name: string, email:string, password: string}>({
        email: '',
        password: '',
        name: ''
    })

    const onChange = (e:any): void => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const onSubmit = (e:any): void => {
        e.preventDefault()
        dispatch(register(form))
    }



    if(isAuth) return  <Navigate to={ state?.from || '/' }/>

    return (
        <div className="container">
            <form className={`${styles.form} main-form`} onSubmit={onSubmit}>
                <h3 className={`text text_type_main-medium mb-6 ${styles.formMainText}`}>Регистрация</h3>
                <div className='mb-6'>
                    <Input onChange={onChange} type={"text"} placeholder={"Имя"} value={form['name']} name={'name'} />
                </div>
                <div className='mb-6'>
                    <Input onChange={onChange} type={"email"} placeholder={"email"} value={form['email']} name={'email'} />
                </div>
                <div className="mb-6">
                    <PasswordInput onChange={onChange} value={form['password']} name={'password'} />
                </div>
                <div className={`${styles.buttonContainer} mb-20`}>
                    <Button type="primary" size="large">
                        Зарегистрироваться
                    </Button>
                </div>
                <div className={styles.bottomText}>
                    <span className="text text_type_main-default">
                        Уже зарегистрированы?
                        <Link className={styles.formLink} to="/login"> Войти</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}

export default Register;