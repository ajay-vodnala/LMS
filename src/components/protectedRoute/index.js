import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Interface from "../interface";
import { useEffect } from "react";
import Header from '../header/index';
const ProtectedRoute=(props)=>{
    const navigate=useNavigate();
    const token=Cookies.get("jwtToken");
     useEffect(()=>{
        if(token===undefined){
            navigate('/dashboard');
        }
    },[navigate])
    if(token===undefined){
        return(
            <Interface/>
        )
    }
    return(
        <>
        <Header/>
        <Outlet/>
        </>
    )
   
}
export default ProtectedRoute;