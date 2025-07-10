import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Home from '../home/index';
const ProtectedRouteForStudent=(props)=>{
    const navigate=useNavigate();
    const role=Cookies.get("role");
     useEffect(()=>{
        if(role==="admin"){
            navigate('/');
        }
    },[navigate])
    if(role==="admin"){
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
export default ProtectedRouteForStudent;