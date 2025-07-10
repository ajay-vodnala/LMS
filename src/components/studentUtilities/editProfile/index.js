import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../register/index.css';
import Swal from 'sweetalert2';
import Preloader from '../../loader/index';
import Cookies from 'js-cookie';
const serverURL = process.env.REACT_APP_SERVER_URL;

const EditProfile=()=>{
  const jwtToken=Cookies.get("jwtToken");
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const [UserInfo,setUserInfo]=useState({
    name: '',
    email:'',
    address: '',
    mobile: null,
    photo: null,
    gender: '',
    age:null,
    qualification:''
});

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      setUserInfo({ ...UserInfo, [e.target.name]: e.target.files[0] });
    } else {
      setUserInfo({ ...UserInfo, [e.target.name]: e.target.value });
    }
  };

      useEffect(()=>{
         const getUpdateUserData=async()=>{
          try {
                  const options={
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        Accept:"application/json",
                        authentication:`Bearer ${jwtToken}`
                    }
                  }
                  const response=await fetch(`${serverURL}/userDetails`,options)
                  const Userdetails= await response.json();
                  const UserInfo=Userdetails[0];
                  setUserInfo({
                      email:UserInfo.email,
                      name:UserInfo.name,
                      age:UserInfo.age,
                      address:UserInfo.address,
                      mobile:UserInfo.mobile,
                      gender:UserInfo.gender,
                      qualification:UserInfo.qualification,
                      photo:UserInfo.photo
                  })
              }
          catch (error) {
                          Swal.fire({
                                  title: 'error!',
                                  text: error,
                                  icon: 'error',
                                  confirmButtonText: 'OK'
                                  })                      }
          setLoading(false);
      }
      getUpdateUserData();
  },[])

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const userData = new FormData();
                userData.append('name', UserInfo.name);
                userData.append('email', UserInfo.email);
                userData.append('mobile', UserInfo.mobile);
                userData.append('qualification', UserInfo.qualification);
                userData.append('gender', UserInfo.gender);
                userData.append('age', UserInfo.age);
                userData.append('address', UserInfo.address);
                userData.append('photo', UserInfo.photo);
            try {
                        const response=await fetch(`${serverURL}/updateUserDetails`,{
                                    method:"PUT",
                                    body:userData
                        });
                        if(response.ok){
                            Swal.fire({
                                    title: 'Success!',
                                    text: 'Details updated successfully',
                                    icon: 'success',
                                    })
                                  }
                        else{
                            Swal.fire({
                                    title: 'error!',
                                    text: 'Internal Server Error else',
                                    icon: 'error',
                                    confirmButtonText: 'OK'
                                    }) 
                        }
                        
            } 
            catch (error) {
                        Swal.fire({
                                title: 'error!',
                                text: error,
                                icon: 'error',
                                confirmButtonText: 'OK'
                                })     
                          }
            setLoading(false)
            navigate("/editProfile")
  };

  return(
    loading?<Preloader/>:
        <div className='container-fluid mt-4'>
            <form  className='addUserForm' onSubmit={handleSubmit}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 addBook-heading mb-2'>
                            <h4>Edit Profile</h4>
                        </div>
                        <div className='col-md-5 col-12'>
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Name :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                 <input
                                  type="text"
                                  name="name"
                                  placeholder="Enter Full Name"
                                  value={UserInfo.name}
                                  onChange={handleChange}
                                  required
                                  className='input-field'
                                />
                            </div>
                          </div>
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Age :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Enter Your Age"
                                    value={UserInfo.age}
                                    onChange={handleChange}
                                    required
                                    className='input-field'
                                  />
                            </div>
                          </div>
                           <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Address :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <textarea
                                  name="address"
                                  placeholder="Enter full Address"
                                  value={UserInfo.address}
                                  onChange={handleChange}
                                  required
                                  className='input-field'
                                /> 
                            </div>
                          </div>    
                        </div>
                        
                        <div className='col-md-2'>

                        </div>
                        
                        <div className='col-md-5 col-12'>
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Mobile :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="Enter Mobile Number"
                                    value={UserInfo.mobile}
                                    onChange={handleChange}
                                    required
                                    className='input-field'
                                  />
                            </div>
                          </div>  
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Qualification :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <select name="qualification" value={UserInfo.qualification} onChange={handleChange} className='select-field-add'>
                                    <option value="-">---select---</option>
                                    <option value="primary">Below 10th</option>
                                    <option value='10th'>10th completed</option>
                                    <option value='intermediate'>Intermediate</option>
                                    <option value='undergraduate'>Under graduate</option>
                                    <option value='graduate'>Graduate</option>
                                    <option value='postgraduate'>Post Graduate</option>
                                    <option value='others'>Others</option>
                                </select>
                            </div>
                          </div> 
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Gender :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input 
                                    type='radio'
                                    value='male'
                                    name='gender'
                                    onChange={handleChange}
                                    className='input-field'
                                />
                                <label>Male</label>
                                <input 
                                    type='radio'
                                    value='female'
                                    name='gender'
                                    onChange={handleChange}
                                    className='input-field ms-3'
                                />
                                <label>Female</label>
                            </div>
                          </div>  
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Photo :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input
                                  type="file"
                                  name="photo"
                                  accept="image/*"
                                  onChange={handleChange}
                                  required
                                  className='input-field'
                                /> 
                            </div>
                          </div>  
                        </div>
                        <div className='col-12 text-center'>
                            <button type="submit" className='btn-reg mb-2'>Edit Details</button>
                        </div>
                    </div>
                </div>
            </form>
             
        </div>
    );
}


export default EditProfile;
