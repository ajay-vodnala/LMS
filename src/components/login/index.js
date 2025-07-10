import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Preloader from '../loader';
const serverURL = process.env.REACT_APP_SERVER_URL;
const Login=()=> {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputType,setInputType]=useState("password");
  const [loading,setLoading]=useState(false);
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
  const handleLogin = async (e) => {
    setLoading(true);
    const parsedEmail=email.toLowerCase();
    e.preventDefault();
    try {

        const response=await fetch(`${serverURL}/login`,{
          method:'POST',
          headers:{
            "Content-type":'application/json',
            Accept:'application/json'
          },
          body:JSON.stringify({
            email:parsedEmail,
            password:password
          })
        });
        const responseData= await response.json();
        if(response.ok){
          Cookies.set('jwtToken',responseData.jwtToken,{expires:30})
          Cookies.set('role',responseData.role,{expires:30})
           Swal.fire({
                        title: 'success!',
                        text: 'login Successfull.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                        })  
          navigate('/');
                     
        } else{
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
                        text: 'Internal server Error',
                        icon: 'error',
                        confirmButtonText: 'OK'
                        })
    }
    setLoading(false);
    // Here, API call or validation logic can be added
  };
      const token=Cookies.get('jwtToken');
      useEffect(
          ()=>{
              if(token!==undefined){
              navigate('/');
      }
          },[]
      )

  return (
    loading?<Preloader/>:
    <div className='login-wrapper'>
    <div className='login-div'>
      <h4>Login</h4>
      <form onSubmit={handleLogin} className='login-form'>
        <label>Email :</label>
        <input
          type="email"
          placeholder="Enter email Id"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className='input-field-login'
        />
        <label>Password :</label>
        <div className='password-field'>
             <input
              type={inputType}
              placeholder="Enter Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className='input-field-Password'
        />
        <div onClick={showPassword}>{icon}</div>
        </div>
        <button type="submit" className='mt-3 mb-3 login-btn'>Login</button>
      </form>
      <p>
        Create new Account? <Link to="/register">Register Now</Link>
      </p>
    </div>
    </div>
  );
}

export default Login;
