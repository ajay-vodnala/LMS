import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Preloader from "../loader";
import '../bookDetails/index.css';
import { Link } from "react-router-dom";
const serverURL = process.env.REACT_APP_SERVER_URL;

const Profile=(props)=>{
    const jwtToken=Cookies.get("jwtToken");
    const [loading,setLoading]=useState(false);
    const [userDetails,setUserDetails]=useState("");
    useEffect(
        ()=>{
            setLoading(true);
            const getUserDetails=async()=>{
                try {
                    const response=await fetch(`${serverURL}/userDetails`,{
                    method:'GET',
                    headers:{
                            "Content-Type":"application/json",
                            Accept:"application/json",
                            authentication:`Bearer ${jwtToken}`
                            }
                        });
                        const getData=await response.json();
                        if(response.ok){
                            setUserDetails(getData[0]);
                        }
                        else{
                            Swal.fire({
                                title: 'error!',
                                text: 'something went worng',
                                icon: 'error',
                                confirmButtonText: 'OK'
                                })  
                        }
                } catch (error) {
                     Swal.fire({
                                title: 'error!',
                                text: 'something went worng',
                                icon: 'error',
                                confirmButtonText: 'OK'
                                })  
                }
                
            }
            getUserDetails();
            setLoading(false);
        },[]
    )
    const statusColor=(userDetails.status==="active")?"statusColorGreen":"statusColorRed";
    return(
        loading?<Preloader/>:(
        <div className='container-fluid content'>
            <div className='row'>
                <div className='col-12 headingBar mb-md-5'>
                    <h4 className="ms-4">Profile</h4>
                </div>
                <div className='col-md-4 col-12 mb-4 mb-md-0 imgDiv'>
                   <img className='bookimage profileImg' src={`${serverURL}/uploads/persons/${userDetails.photo}`} alt='Not Available'/>
                </div>
                <div className='col-12 col-md-8'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Email ID:</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{userDetails.email}</p>
                            </div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Name :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{userDetails.name}</p>
                            </div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Role :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{userDetails.role}</p>
                            </div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Gender :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{userDetails.gender}</p>
                            </div><div className='col-md-2 col-4'>
                                <p className='contentHeading'>Mobile :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{userDetails.mobile}</p>
                            </div><div className='col-md-2 col-4'>
                                <p className='contentHeading'>Address :</p>
                            </div>
                             <div className='col-md-8 col-7'>
                                <p>{userDetails.address}</p>
                            </div>
                            <div className='col-md-2'></div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Qualification&nbsp;:</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{userDetails.qualification}</p>
                            </div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Age :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{userDetails.age}</p>
                            </div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Status :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p className={statusColor}>{userDetails.status}</p>
                            </div>
                            <div className='col-md-10 col-7'>
                                <Link to='/editProfile'><button className={"blue-btn"}>Edit Profile</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
)
}
export default Profile;