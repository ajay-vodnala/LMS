import '../index.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import 'react-native-get-random-values';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from 'uuid';
import Preloader from '../../../loader';
import Cookies from 'js-cookie';
const serverURL = process.env.REACT_APP_SERVER_URL;
const jwtToken=Cookies.get("jwtToken");
const AddBook=()=>{
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
const [bookDetails,setBookDetails]=useState({
             bookid:uuidv4(),
             title:'',
             author:'',
             description:'',
             location:'',
             yearofpublish:'',
             department:'',
             language:'',
             publisher:'',
             imageurl:'',
             status:'available',
             appliedby:''
});
console.log(jwtToken);

    const addBookToDataBase= async (e)=>{
        e.preventDefault();
        setLoading(true);
        
                if (!bookDetails.imageurl) return;
            
                const ImageData = new FormData();
                ImageData.append("file", bookDetails.imageurl);
                ImageData.append("upload_preset", "lms_image_upload"); 
                ImageData.append("cloud_name", "dphkbv1mt"); 
            
                try {
                  const res = await fetch("https://api.cloudinary.com/v1_1/dphkbv1mt/image/upload", {
                    method: "POST",
                    body: ImageData
                  });
                  const json = await res.json();
                  const data={
                        title: bookDetails.title,
                        author: bookDetails.author,
                        description: bookDetails.description,
                        location: bookDetails.location,
                        yearofpublish: bookDetails.yearofpublish,
                        department: bookDetails.department,
                        language: bookDetails.language,
                        publisher: bookDetails.publisher,
                        status: bookDetails.status,
                        appliedby: bookDetails.appliedby,
                        imageurl:json.secure_url,
                        bookid: bookDetails.bookid
                  }

                    const response=await fetch(`${serverURL}/addbook`,{
                                method:"POST",
                                headers: {
                                        "Content-Type": "application/json",
                                        accept:"application/json",
                                        authentication:`Bearer ${jwtToken}`
                                    },
                                body:JSON.stringify(data)
                    });
                    if(response.ok){
                        Swal.fire({
                                title: 'Success!',
                                text: 'Book Added Successfully',
                                icon: 'success',
                                confirmButtonText: 'OK'
                                })
                    }
                    else{
                        Swal.fire({
                                title: 'error!',
                                text: ' Error',
                                icon: 'error',
                                confirmButtonText: 'OK'
                                }) 
                    }
                } catch (err) {
                   Swal.fire({
                            title: 'error!',
                            text: "internal server error",
                            icon: 'error',
                            confirmButtonText: 'OK'
                            })   
                }
        navigate("/addBook")
        setLoading(false);
    }
    const handleChange=(e)=>{
        if(e.target.name==='imageurl'){
              setBookDetails({...bookDetails,[e.target.name]:e.target.files[0]});
           }
        else{
              setBookDetails({...bookDetails,[e.target.name]:e.target.value});
        }
    }
    return(
        loading?<Preloader/>:
        <div className='container-fluid'>
            <form onSubmit={addBookToDataBase} className='addBookForm'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 addBook-heading mb-2'>
                            <h4>Add Book</h4>
                        </div>
                        <div className='col-md-5 col-12'>
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-12 col-sm-5 col-lg-4'>
                                <label>Book Title :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input 
                                    type='text'
                                    placeholder='Enter book title'
                                    value={bookDetails.title}
                                    name='title'
                                    onChange={handleChange}
                                    required
                                    className='input-field'
                                />
                            </div>
                          </div>  
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-12 col-sm-5 col-lg-4'>
                                <label>Author Name :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input
                                    type="text"
                                    name="author"
                                    placeholder="Enter Author Name"
                                    value={bookDetails.author}
                                    onChange={handleChange}
                                    required
                                    className='input-field'
                                />
                            </div>
                          </div>
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-12 col-sm-5 col-lg-4'>
                                <label>Description :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <textarea
                                    type="text"
                                    name="description"
                                    placeholder="Enter Book Description"
                                    value={bookDetails.description}
                                    onChange={handleChange}
                                    required
                                    className='input-field'
                                /> 
                            </div>
                          </div>  
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-12 col-sm-5 col-lg-4'>
                                <label>Location (eg:A-1-2):</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Enter Location (rack-row-column)"
                                    value={bookDetails.location}
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
                            <div className='col-12 col-sm-5 col-lg-4'>
                                <label>Year Of Publish :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input
                                    type="number"
                                    name="yearofpublish"
                                    placeholder="Enter published Year"
                                    value={bookDetails.yearofpublish}
                                    onChange={handleChange}
                                    required
                                    className='input-field'
                                />
                            </div>
                          </div>  
                                                    <div className='row mb-3 mb-md-5'>
                            <div className='col-12 col-sm-5 col-lg-4'>
                                <label>Department :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <select name="department" value={bookDetails.department} onChange={handleChange} className='select-field-add'>
                                    <option value="-">---select---</option>
                                    <option value="Art&Design">Art & Design</option>
                                    <option value='Finance'>Finance</option>
                                    <option value='Human_Resources'>Human Resources</option>
                                    <option value='Information&Technology'>Information Technology</option>
                                    <option value='pysics'>Physics</option>
                                    <option value='chemistry'>Chemistry</option>
                                    <option value='pharma'>pharma</option>
                                    <option value='compitetive'>Compitetive</option>
                                    <option value='history'>History</option>
                                    <option value='science'>Science</option>
                                    <option value='english'>English</option>
                                    <option value='culture'>Culture & Tradition</option>
                                </select>
                            </div>
                          </div> 
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-12 col-sm-5 col-lg-4'>
                                <label>Book Language :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input 
                                    type='text'
                                    placeholder='Enter book language'
                                    value={bookDetails.language}
                                    name='language'
                                    onChange={handleChange}
                                    required
                                    className='input-field'
                                />
                            </div>
                          </div>  
 
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-12 col-sm-5 col-lg-4'>
                                <label>Publisher :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input
                                    type="text"
                                    name="publisher"
                                    placeholder="Enter Book publisher"
                                    value={bookDetails.publisher}
                                    onChange={handleChange}
                                    required
                                    className='input-field'
                                /> 
                            </div>
                          </div>  
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-12 col-sm-5 col-lg-4'>
                                <label>Book Image:</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input
                                    type="file"
                                    name="imageurl"
                                    onChange={handleChange}
                                    required
                                    accept="image/*"
                                    className='input-field'
                                /> 
                            </div>
                          </div>  
                        </div>
                        <div className='col-12 text-center'>
                            <button type='submit' className='add-submit-btn'>ADD BOOK</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default AddBook
