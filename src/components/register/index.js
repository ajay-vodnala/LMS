import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import Swal from 'sweetalert2';
import Preloader from '../loader';
import Cookies from 'js-cookie';
const serverURL = process.env.REACT_APP_SERVER_URL;

const Register=()=>{
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const [inputType,setInputType]=useState("password");
  const [icon,setIcon]=useState(<i class="fa-regular fa-eye-slash"></i>);

  const showPassword=()=>{
    if(inputType==="password"){
      setInputType("text");
      setIcon(<i class="fa-regular fa-eye"></i>);
    }else{
      setInputType("password");
      setIcon(<i class="fa-regular fa-eye-slash"></i>);
    }
  }
  

  const [form, setForm] = useState({
    role: 'student',
    name: '',
    email: '',
    password: '',
    address: '',
    mobile: null,
    photo: null,
    gender: '',
    age:null,
    status:'active',
    qualification:''
  });

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    if(form.role==='admin'){
      form.status="blocked";
    }
    const ParsedEmail=form.email.toLowerCase();
                if (!form.photo) return;
            
                const data = new FormData();
                data.append("file", form.photo);
                data.append("upload_preset", "lms_image_upload"); 
                data.append("cloud_name", "dphkbv1mt"); 
            
                try {
                  const res = await fetch("https://api.cloudinary.com/v1_1/dphkbv1mt/image/upload", {
                    method: "POST",
                    body: data
                  });
                  const json = await res.json();
                  const userData = {
                      role:form.role,
                      email:ParsedEmail,
                      name:form.name,
                      password:form.password,
                      mobile:form.mobile,
                      qualification:form.qualification,
                      gender:form.gender,
                      age:form.age,
                      status:form.status,
                      address:form.address,
                      photo:json.secure_url
                  }
                        const response=await fetch(`${serverURL}/register`,{
                                    method:"POST",
                                    headers:{
                                      "Content-Type":'application/json',
                                      "accept":"application/json"
                                    },
                                    body:JSON.stringify(userData)
                        });
                        const responseData=await response.json();
                        if(response.ok){
                            Swal.fire({
                                    title: 'Success!',
                                    text: responseData.text,
                                    icon: 'success',
                                    })
                                    navigate('/login');
                                  }
                        else{
                            Swal.fire({
                                    title: 'error!',
                                    text: responseData.text,
                                    icon: 'error',
                                    confirmButtonText: 'OK'
                                    }) 
                        }                                    
                } catch (error) {
                        Swal.fire({
                                title: 'error!',
                                text: error,
                                icon: 'error',
                                confirmButtonText: 'OK'
                                })     
                          }
            setLoading(false)
            navigate("/register")
  };
      const token=Cookies.get('jwtToken');
      useEffect(
          ()=>{
              if(token!==undefined){
              navigate('/');
      }
          },[]
      )
  return(
    loading?<Preloader/>:
        <div className='container-fluid mt-4'>
            <form  className='addBookForm' onSubmit={handleSubmit}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 addBook-heading mb-2'>
                            <h4>Register as {form.role === 'admin' ? 'Admin' : 'Student'}</h4>
                        </div>
                        <div className='col-md-5 col-12'>
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Role :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <select name="role" value={form.role} onChange={handleChange} className='select-field'>
                                  <option value="Student">Student</option>
                                  <option value="admin">Admin</option>
                                </select>
                            </div>
                          </div>  
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Name :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                 <input
                                  type="text"
                                  name="name"
                                  placeholder="Enter Full Name"
                                  value={form.name}
                                  onChange={handleChange}
                                  required
                                  className='input-field'
                                />
                            </div>
                          </div>
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Email :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input
                                  type="email"
                                  name="email"
                                  placeholder="Enter Email"
                                  value={form.email}
                                  onChange={handleChange}
                                  required
                                  className='input-field'
                                /> 
                            </div>
                          </div>  
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Create Password :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <div className='password-field'>
                                    <input
                                      type={inputType}
                                      name='password'
                                      placeholder="Enter strong Password"
                                      value={form.password}
                                      onChange={handleChange}
                                      required
                                      className='input-field-Password'
                                  />
                                <div onClick={showPassword}>{icon}</div>
                                </div> 
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
                                    value={form.age}
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
                                    value={form.mobile}
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
                                <select name="qualification" value={form.qualification} onChange={handleChange} className='select-field-add'>
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
                                <label>Address :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <textarea
                                  name="address"
                                  placeholder="Enter full Address"
                                  value={form.address}
                                  onChange={handleChange}
                                  required
                                  className='input-field'
                                /> 
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
                            <button type="submit" className='btn-reg mb-2'>Register</button>
                            <p>
                                Already registered? <Link to="/login">Login here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
             
        </div>
    );
}


export default Register;