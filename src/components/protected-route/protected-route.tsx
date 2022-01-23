import {Navigate, useLocation, Outlet } from 'react-router-dom';
import {useSelector} from "../../utils/hooks";

export function ProtectedRoute() {

    const isAuth: boolean = useSelector((state) => state.auth.isAuth)

    const location = useLocation()

    return (
        isAuth ? <Outlet /> : <Navigate to={'/login'} state={{from: location}} />
    );
}