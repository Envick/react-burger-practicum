import React, {useState} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password.module.css'
import {Link} from "react-router-dom";


function ResetPassword() {
    const [form, setForm] = useState({
        password: '',
        code: '',
    })
    const onChange = (e:any) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    return (
        <div className="container">
            <form className={`${styles.form} login-form`}>
                <h3 className={`text text_type_main-medium mb-6 ${styles.formMainText}`}>Регистрация</h3>
                <div className='mb-6'>
                    <PasswordInput onChange={onChange} value={form['password']} name={'password'} />
                </div>
                <div className='mb-6'>
                    <Input type={"text"} onChange={onChange} placeholder={"Введите код из письма"} value={form['code']} name={'code'} />
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