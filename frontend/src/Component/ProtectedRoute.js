import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ()=>{
    const token = localStorage.getItem('token');
    if(!token) return <Navigate to='login'/>
    return token.length > 0 ? <Outlet /> : <Navigate to='login' />
}

export default ProtectedRoute
