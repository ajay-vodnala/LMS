import './index.css';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Preloader from '../loader';
const serverURL = process.env.REACT_APP_SERVER_URL;
const BookDetails=()=>{
    const [bookDetails,setBookDetails]=useState({
        title:" ",
        author:" ",
        description:" ",
        location:" ",
        yearofpublish:" ",
        department:" ",
        language:" ",
        publisher:" ",
        imageurl:""
    });
    const [loading,setLoading]=useState(false);
    const {bookid}=useParams();
    useEffect(
        ()=>{
            const getdata=async()=>{
            setLoading(true);
            const response=await fetch(`${serverURL}/bookDetails/${bookid}`);
            console.log(response);
            const bookInfo=await response.json();
            console.log(bookInfo);
            setBookDetails(bookInfo);
        }
            try {
             getdata();    
            } catch (error) {
                console.log(error)
            }
           setLoading(false);
        },[]
    )
    const imageSource=(bookDetails.imageurl.includes('cloudinary'))?bookDetails.imageurl:`${serverURL}/uploads/books/${bookDetails.imageurl}`;
    return(
        loading?<Preloader/>:(
        <div className='container-fluid content'>
            <div className='row'>
                <div className='col-12 headingBar mb-5'>
                    <h4>Book Information</h4>
                </div>
                <div className='col-md-4 col-12  imgDiv'>
                   <img className='bookimage' src={imageSource} alt='Not Available'/>
                </div>
                <div className='col-12 col-md-8'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Book ID:</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{bookid}</p>
                            </div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Title :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{bookDetails.title}</p>
                            </div><div className='col-md-2 col-4'>
                                <p className='contentHeading'>Author :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{bookDetails.author}</p>
                            </div><div className='col-md-2 col-4'>
                                <p className='contentHeading'>Language :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{bookDetails.language}</p>
                            </div><div className='col-md-2 col-4'>
                                <p className='contentHeading'>Location :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{bookDetails.location}</p>
                            </div><div className='col-md-2 col-4'>
                                <p className='contentHeading'>Publishers :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{bookDetails.publisher}</p>
                            </div><div className='col-md-2 col-4'>
                                <p className='contentHeading'>Year Of Publish :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{bookDetails.yearofpublish}</p>
                            </div><div className='col-md-2 col-4'>
                                <p className='contentHeading'>Department :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{bookDetails.department}</p>
                            </div><div className='col-md-2 col-4'>
                                <p className='contentHeading'>Description : </p>
                            </div><div className='col-md-10 col-7'>
                                <p>{bookDetails.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
)
}
export default BookDetails;
