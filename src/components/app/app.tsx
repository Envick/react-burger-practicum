import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import Ingredient from "../../pages/ingredient";
import PageNotFound from "../../pages/page-not-found";
import {ProtectedRoute} from "../protected-route/protected-route";
import ModalIngredient from "../modal-ingredient/modal-ingredient";
import {getIngredients} from "../../services/actions/ingredients";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])
    return (
        <div className="app">
            <Router >
                <AppHeader/>
                <AppRoutes/>
            </Router>
        </div>
    );
}

function AppRoutes () {
    const location = useLocation()
    const background = location.state?.background

    return (
        <>
            <Routes location={background ?? location}>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route  path='/profile' element={<ProtectedRoute/>}>
                    <Route  path='/profile' element={<Profile/>}/>
                </Route>
                <Route path="/ingredients/:id" element={<Ingredient/>}/>
                <Route element={<PageNotFound/>}/>
            </Routes>
            <Routes>
                {background && <Route path="/ingredients/:id" element={<ModalIngredient isOpen={Boolean(background)}/>}/>}
            </Routes>
        </>
    )
}

export default App;
