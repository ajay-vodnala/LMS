import '../../index.css';
import {useNavigate,useParams} from 'react-router-dom';
import { useState ,useEffect} from 'react';
import Swal from 'sweetalert2';
import Preloader from '../../../../loader';
const UpdateBookForm=()=>{
    useEffect(()=>{
       const getUpdateBookData=async()=>{
        try {
                const response=await fetch(`http://localhost:5000/bookDetails/${bookId}`)
                const bookInfo= await response.json();
                setBookDetails({
                    title:bookInfo.title,
                    author:bookInfo.author,
                    description:bookInfo.description,
                    location:bookInfo.location,
                    yearOfPublish:bookInfo.yearOfPublish,
                    department:bookInfo.department,
                    language:bookInfo.language,
                    publisher:bookInfo.publisher,
                    imageUrl:bookInfo.imageUrl
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
    getUpdateBookData();
},[])
    const {bookId}=useParams();
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();
    const [bookDetails,setBookDetails]=useState({
            title:'NA',
            author:'NA',
            description:'NA',
            location:'NA',
            yearOfPublish:'NA',
            department:'NA',
            language:'NA',
            publisher:'NA',
            imageUrl:null
        });
    const updateBookToDataBase= async (e)=>{
        e.preventDefault();
        setLoading(true)
        const data = new FormData();
            data.append('title', bookDetails.title);
            data.append('author', bookDetails.author);
            data.append('description', bookDetails.description);
            data.append('location', bookDetails.location);
            data.append('yearOfPublish', bookDetails.yearOfPublish);
            data.append('department', bookDetails.department);
            data.append('language', bookDetails.language);
            data.append('publisher', bookDetails.publisher);
            data.append('imageUrl', bookDetails.imageUrl);
        try {
                const response=await fetch(`http://localhost:5000/updateBook/${bookId}`,{
                                            method:"PUT",
                                            body:data
                                         })

                if (response.ok){
                    Swal.fire({
                            title: 'Success!',
                            text: 'Book Updated Successfully',
                            icon: 'success',
                            confirmButtonText: 'OK'
                            })
                }
                else{
                    Swal.fire({
                            title: 'error!',
                            text: 'something went worng, try again',
                            icon: 'error',
                            confirmButtonText: 'OK'
                            })
                }
        } 
        catch (error) {
                Swal.fire({
                        title: 'error!',
                        text: 'internal Server error',
                        icon: 'error',
                        confirmButtonText: 'OK'
                        })
        }
        navigate('/updateBooksList');
    }
    const handleChange=(e)=>{
        if(e.target.name==='imageUrl'){
              setBookDetails({...bookDetails,[e.target.name]:e.target.files[0]});
           }
        else{
              setBookDetails({...bookDetails,[e.target.name]:e.target.value});
        }
    }
    return(
        loading?<Preloader/>:(<div className='container-fluid'>
            <form onSubmit={updateBookToDataBase} className='addBookForm'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 addBook-heading mb-2'>
                            <h4>Update Book</h4>
                        </div>
                        <div className='col-md-5 col-12'>
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Book Title :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input 
                                    type='text'
                                    placeholder='Enter book title'
                                    value={bookDetails.title}
                                    name='title'
                                    onChange={handleChange}
                                    className='input-field'
                                />
                            </div>
                          </div>  
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Author Name :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input
                                    type="text"
                                    name="author"
                                    placeholder="Enter Author Name"
                                    value={bookDetails.author}
                                    onChange={handleChange}
                                    className='input-field'
                                />
                            </div>
                          </div>  
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Description :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <textarea
                                    type="text"
                                    name="description"
                                    placeholder="Enter Book Description"
                                    value={bookDetails.description}
                                    onChange={handleChange}
                                    className='input-field'
                                /> 
                            </div>
                          </div>  
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Location (eg:A-1-2):</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Enter Location (rack-row-column)"
                                    value={bookDetails.location}
                                    onChange={handleChange}
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
                                <label>Year Of Publish :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input
                                    type="number"
                                    name="yearOfPublish"
                                    placeholder="Enter published Year"
                                    value={bookDetails.yearOfPublish}
                                    onChange={handleChange}
                                    className='input-field'
                                />
                            </div>
                          </div>  
                                                    <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
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
                            <div className='col-5 col-lg-4'>
                                <label>Book Language :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input 
                                    type='text'
                                    placeholder='Enter book language'
                                    value={bookDetails.language}
                                    name='language'
                                    onChange={handleChange}
                                    className='input-field'
                                />
                            </div>
                          </div>  
 
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Publisher :</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input
                                    type="text"
                                    name="publisher"
                                    placeholder="Enter Book publisher"
                                    value={bookDetails.publisher}
                                    onChange={handleChange}
                                    className='input-field'
                                /> 
                            </div>
                          </div>  
                          <div className='row mb-3 mb-md-5'>
                            <div className='col-5 col-lg-4'>
                                <label>Book Image:</label>
                            </div>
                            <div className='col-7 col-lg-8'>
                                <input
                                    type="file"
                                    name="imageUrl"
                                    onChange={handleChange}
                                    accept="image/*"
                                    className='input-field'
                                /> 
                            </div>
                          </div>  
                        </div>
                        <div className='col-12 text-center'>
                            <button type='submit' className='add-submit-btn'>UPDATE BOOK</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>)
    )
}
export default UpdateBookForm;