import '../bookDetails/index.css';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Preloader from '../loader';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
const AdminDetails=()=>{
    const [adminDetails,setAdminDetails]=useState({
        email:'',
        role:'',
        name:'',
        mobile:null,
        gender:'',
        address:'',
        qualification:'',
        photo:null,
        age:null
    });
    const jwtToken=Cookies.get("jwtToken");
    const [loading,setLoading]=useState(false);
     const currentStatus=adminDetails.status;
    const statusText=(currentStatus==='blocked')?"Approve Admin":"Block Profile";
    const btnColor=(currentStatus==='blocked')?"blue-btn":"red-btn";    
    const {email}=useParams();
    const manageAdmin= async ()=>{
        const updateStatusText=(currentStatus==='blocked')?"active":"blocked";
        const alertText=(currentStatus==='blocked')?"Admin Approved Successfully":"Admin Blocked Successfully";
        try {
            const options={
                method:"PUT",
                headers:{
                    "Content-type":"application/json",
                    Accept:"application/json",
                    Authentication:jwtToken
                },
                body:JSON.stringify({email:adminDetails.email,
                    statusText:updateStatusText})
            }
            const response=await fetch("https://lms-backend-4-k10h.onrender.com/updateUserStatus",options);
            if(response.ok){
                Swal.fire({
                        title: 'success!',
                        text: alertText,
                        icon: 'success',
                        confirmButtonText: 'OK'
                        })
            }else{
                Swal.fire({
                        title: 'error!',
                        text: 'Internal Server Error',
                        icon: 'error',
                        confirmButtonText: 'OK'
                        })
            }
        } catch (error) {
             Swal.fire({
                        title: 'error!',
                        text: 'Internal Server Error',
                        icon: 'error',
                        confirmButtonText: 'OK'
                        })
        }
    }

    useEffect(
        ()=>{
            const getdata=async()=>{ 
            setLoading(true);
            const response=await fetch(`https://lms-backend-4-k10h.onrender.com/studentDetails/${email}`);
            const adminInfo=await response.json();
            setAdminDetails(adminInfo);
            }
            try {
             getdata();    
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        },[adminDetails]
    )
    return(
        loading?<Preloader/>:(
        <div className='container-fluid content'>
            <div className='row'>
                <div className='col-12 headingBar mb-5'>
                    <h4>Admin Information</h4>
                </div>
                <div className='col-md-4 col-12 imgDiv'>
                   <img className='bookimage' src={`https://lms-backend-4-k10h.onrender.com/uploads/persons/${adminDetails.photo}`} alt='Not Available'/>
                </div>
                <div className='col-12 col-md-8'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Email ID:</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{email}</p>
                            </div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Name :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{adminDetails.name}</p>
                            </div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Role :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{adminDetails.role}</p>
                            </div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Gender :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{adminDetails.gender}</p>
                            </div><div className='col-md-2 col-4'>
                                <p className='contentHeading'>Mobile :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{adminDetails.mobile}</p>
                            </div><div className='col-md-2 col-4'>
                                <p className='contentHeading'>Address :</p>
                            </div>
                             <div className='col-md-8 col-7'>
                                <p>{adminDetails.address}</p>
                            </div>
                            <div className='col-md-2'></div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Qualification :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{adminDetails.qualification}</p>
                            </div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Age :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{adminDetails.age}</p>
                            </div>
                            <div className='col-md-10 col-7'>
                                <button className={`${btnColor}`} onClick={manageAdmin}>{statusText}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
)
}
export default AdminDetails;
