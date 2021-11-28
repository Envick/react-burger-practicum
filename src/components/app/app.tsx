import React from 'react';
import AppHeader from "../app-header/app-header";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import Ingredient from "../../pages/ingredient";
import PageNotFound from "../../pages/page-not-found";

function App() {
    return (
    <div className="app">
        <AppHeader/>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/ingredient:id" element={<Ingredient/>}/>
                <Route element={<PageNotFound/>}/>
            </Routes>
        </Router>
    </div>
    );
}

export default App;
