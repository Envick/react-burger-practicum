import {Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import {useSelector} from "react-redux";

export function ProtectedRoute({ children }:any) {

    const isAuth = useSelector((state: any) => state.auth.isAuth)

    const location = useLocation()

    //@ts-ignore

    return (
        isAuth ? <Outlet /> : <Navigate to={'/login'} state={{from: location}} />
    );
}