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
import {useDispatch} from "../../utils/hooks";
import ProfileOrders from "../../pages/profile-orders";
import Feed from "../../pages/feed";
import FeedItem from "../../pages/feed-item";
import ModalFeed from "../modal-feed";
import ProfileOrdersItem from "../../pages/profile-orders-item";
import ModalProfileOrder from "../modal-profile-order";

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
    const feedBackground = location.state?.feedBackground
    return (
        <>
            <Routes location={background ?? feedBackground ?? location}>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/feed" element={<Feed/>}/>
                <Route path="/feed/:id" element={<FeedItem/>}/>
                <Route  path='/profile' element={<ProtectedRoute/>}>
                    <Route  path='/profile' element={<Profile/>}/>
                    <Route  path='/profile/orders' element={<ProfileOrders/>}/>
                    <Route  path='/profile/orders/:id' element={<ProfileOrdersItem/>}/>
                </Route>
                <Route path="/ingredients/:id" element={<Ingredient/>}/>
                <Route element={<PageNotFound/>}/>
            </Routes>
            <Routes>
                {background && <Route path="/ingredients/:id" element={<ModalIngredient isOpen={Boolean(background)}/>}/>}
            </Routes>
            <Routes>
                {feedBackground && <Route path="/feed/:id" element={<ModalFeed isOpen={Boolean(feedBackground)}/>}/>}
                {feedBackground && <Route path="/profile/orders/:id" element={<ModalProfileOrder isOpen={Boolean(feedBackground)}/>}/>}
            </Routes>
        </>
    )
}

export default App;
