import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Preloader from '../loader';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
const serverURL = process.env.REACT_APP_SERVER_URL;
const StudentDetails=()=>{
    const [studentDetails,setStudentDetails]=useState({
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
    const jwtToken =Cookies.get("jwtToken");
    const currentStatus=studentDetails.status;
    const statusText=(currentStatus==='blocked')?"Unblock Profile":"Block Profile";
    const btnColor=(currentStatus==='blocked')?"blue-btn":"red-btn";  
    const [count,setCount]=useState(0);
    let statusColor=(currentStatus==='blocked')?"statusColorRed":"statusColorGreen";
    const [loading,setLoading]=useState(false);
    const {email}=useParams();

     const manageStudent= async ()=>{
        setLoading(true);
            const updateStatusText=(currentStatus==='blocked')?"active":"blocked";
            const alertText=(currentStatus==='blocked')?"Unblocked Successfully":"Blocked Successfully";
            try {
                const options={
                    method:"PUT",
                    headers:{
                        "Content-type":"application/json",
                        Accept:"application/json",
                        Authentication:jwtToken
                    },
                    body:JSON.stringify({email:studentDetails.email,
                        statusText:updateStatusText})
                }
                const response=await fetch(`${serverURL}/updateUserStatus`,options);
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
            setCount(count+1);
            setLoading(false);
        }

    useEffect(
        ()=>{
            setLoading(true);
            const getdata=async()=>{ 
            const response=await fetch(`${serverURL}/studentDetails/${email}`);
            const studentInfo=await response.json();
            setStudentDetails(studentInfo);
            }
            try {
             getdata();    
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        },[count]
    )
        const imageSource=(studentDetails.photo.includes('cloudinary'))?photo:`${serverURL}/uploads/persons/${studentDetails.photo}`;
    return(
        loading?<Preloader/>:(
        <div className='container-fluid content'>
            <div className='row'>
                <div className='col-12 headingBar mb-5'>
                    <h4>Student Information</h4>
                </div>
                <div className='col-md-4 col-12 imgDiv'>
                   <img className='bookimage' src={imageSource} alt='Not Available'/>
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
                                <p>{studentDetails.name}</p>
                            </div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Role :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{studentDetails.role}</p>
                            </div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Gender :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{studentDetails.gender}</p>
                            </div><div className='col-md-2 col-4'>
                                <p className='contentHeading'>Mobile :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{studentDetails.mobile}</p>
                            </div><div className='col-md-2 col-4'>
                                <p className='contentHeading'>Address :</p>
                            </div>
                             <div className='col-md-8 col-7'>
                                <p>{studentDetails.address}</p>
                            </div>
                            <div className='col-md-2'></div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Qualification :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{studentDetails.qualification}</p>
                            </div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Age :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{studentDetails.age}</p>
                            </div>
                             <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Status :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p className={`text ${statusColor}`}>{studentDetails.status}</p>
                            </div>
                            <div className='col-md-10 col-7'>
                                <button className={`${btnColor}`} onClick={manageStudent}>{statusText}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
)
}
export default StudentDetails;
