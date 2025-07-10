import { useState } from 'react';
import './index.css';
const Contact=()=>{
  const [emailProperties,setEmailProperties]=useState({
                                                      subject:'',
                                                      body:''
                                                    });
  const submitMail=(e)=>{
    e.preventDefault();
  }
  const handleChange=(e)=>{
      setEmailProperties({ ...emailProperties, [e.target.name]: e.target.value });
  }
  return(
    <div className="contactDiv">
      <div className="container-fluid">
        <div className='col-12 headingBar'>
          <h4 className="ms-0 ms-md-4">Contact Us</h4>
        </div>
          <div className="col-12 mailForm">
            <div>
                <form onSubmit={submitMail}>
                    <h5 className='contactHeading text-center'>Contact via mail</h5>
                    <label>Subject :</label>
                    <textarea
                    value={emailProperties.subject}
                    name="subject"
                    placeholder="Enter mail subject"
                    rows="2"
                    onChange={handleChange}
                    className='input-field mb-2'
                    />
                    <label>Body :</label>
                    <textarea
                    value={emailProperties.body}
                    name="body"
                    placeholder="Enter mail body"
                    rows="5"
                    onChange={handleChange}
                    className='input-field mb-2'
                    />
                </form>
                <a href={`mailto:ajayvodnala5496@gmail.com?subject=${emailProperties.subject}&body=${emailProperties.body}`} target="_blank" className='mt-2' ><button class="btn btn-outline-primary ms-auto"><i class="mail" className="fa-solid me-2 fa-envelope"></i><b><i>Send</i></b></button></a>              
            </div> 
          </div>
          <h5 className='contactHeading mt-3'>Contact via social media</h5>
          <div className='socialIcons mt-2'>
            <span className="icon phoneIcon">
              <a href="tel:+918187853505" target="_blank"><i className="fa-solid me-1 ms-1 fa-phone"></i></a>
            </span>
            <span className="icon facebookIcon">
              <a href="https://www.facebook.com/" target="_blank"><i className="fa-brands me-1 ms-1 fa-facebook"></i></a>
            </span>
            <span className="icon instaIcon">
              <a href="https://www.instagram.com/ajayvodnala_3505" target="_blank"><i className="fa-brands me-1 ms-1 fa-instagram"></i></a>
            </span>
            <span className="icon telegramIcon">
              <a href="https://t.me/" target="_blank"><i className="fa-brands me-1 ms-1 fa-telegram"></i></a>
            </span>
            <span className="icon whatsappIcon">
              <a href="https://wa.me/+918187853505" target="_blank"><i className="fa-brands me-1 ms-1 fa-whatsapp"></i></a>
            </span>
          </div>
        </div>
        <div>
          <p className='rights text-center mt-3 mt-md-0'>Designed By <b>Ajay Vodnala</b></p>
          <p className='copyright ms-md-5 ms-0'><i class="fa-solid fa-copyright"></i> All rights reserved 2025</p>
        </div>
        
    </div>
  )
}
export default Contact;