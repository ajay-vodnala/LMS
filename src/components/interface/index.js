import { Link,useNavigate } from "react-router-dom";
import './index.css'
import Cookies from "js-cookie";
import { useEffect } from "react";
const Interface=()=>{
    const navigate=useNavigate();
    const token=Cookies.get('jwtToken');
    useEffect(
        ()=>{
            if(token!=undefined){
            navigate('/');
    }
        },[]
    )
    
    return(
        <div className="container-fluid interfaceMainDiv">
            <div className="row">
                <div className="col-12 btns-div">
                    <Link to='/login'><button className="dashboard-btns me-4">Login</button></Link>
                    <Link to='/register'><button className="dashboard-btns me-1 me-md-5">Register</button></Link>
                </div>
                <div className="interfaceContent">
                    <h4 className="interfaceHeading">Library</h4>
                    <p className="tagLine">"a delivery room for the birthplace of ideas,<br/>a place where the history comes to life" </p>
                </div>
            </div>
        </div>
    )
}
export default Interface;