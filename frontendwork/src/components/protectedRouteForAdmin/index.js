import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Home from '../home/index';
const ProtectedRouteForAdmin=(props)=>{
    const navigate=useNavigate();
    const role=Cookies.get("role");
     useEffect(()=>{
        if(role==="student"){
            navigate('/');
        }
    },[navigate])
    if(role==="student"){
        return(
            <Home/>
        )
    }
    return(
        <>
        <Outlet/>
        </>
    )
   
}
export default ProtectedRouteForAdmin;