import './index.css';
import { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Preloader from '../loader';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import RatingModel from '../ratings/ratingModel';
const serverURL = process.env.REACT_APP_SERVER_URL;
const role=Cookies.get('role');
const jwtToken=Cookies.get('jwtToken');
const BookDetails=()=>{
    const [count,setCount]=useState(0);
    const [modalShow, setModalShow] =useState(false);
    const [bookDetails,setBookDetails]=useState({
        title:" ",
        author:" ",
        description:" ",
        location:" ",
        yearofpublish:" ",
        department:" ",
        language:" ",
        publisher:" ",
        imageurl:"",
        status:"",
        ratings:[]
    });
    const [loading,setLoading]=useState(false);
    const {bookid}=useParams();
    const applyBook= async ()=>{
              setLoading(true);
               try {
                      const response=await fetch(`${serverURL}/updateBookStatus/${bookid}`,{
                                                  method:"PUT",
                                                  headers:{
                                                      "Content-Type":"application/json",
                                                      Accept:"application/json",
                                                      authentication:`Bearer ${jwtToken}`
                                                  },
                                                  body:JSON.stringify({status:"application-pending",
                                                    appliedby:"email"
                                                  })
                                                })
          
                      if (response.ok){
                          Swal.fire({
                                  title: 'Success!',
                                  text: 'Book Applied Successfully,Wait for Approval',
                                  icon: 'success',
                                  confirmButtonText: 'OK'
                                  })
                      }
                      else{
                          Swal.fire({
                                  title: 'error!',
                                  text: 'internal server Error',
                                  icon: 'error',
                                  confirmButtonText: 'OK'
                                  })
                      }
                    } 
                      catch (error) {
                              Swal.fire({
                                      title: 'error!',
                                      text: 'internal server error',
                                      icon: 'error',
                                      confirmButtonText: 'OK'
                                      })
                      }
                      setLoading(false)
                      setCount(count+1);
            }
    useEffect(
        ()=>{
            const getdata=async()=>{
            setLoading(true);
            const response=await fetch(`${serverURL}/bookDetails/${bookid}`);
            const bookInfo=await response.json();
            setBookDetails(bookInfo);
        }
            try {
             getdata();    
            } catch (error) {
                console.log(error)
            }
           setLoading(false);
        },[count,modalShow]
    )
    const imageSource=(bookDetails.imageurl.includes('cloudinary'))?bookDetails.imageurl:`${serverURL}/uploads/books/${bookDetails.imageurl}`;
    const applyButton=(bookDetails.status==="available"&&role==='student')?<div><button className='blue-btn mt-3' onClick={applyBook}>Apply Book</button></div>:null;
    let rating=0;
    if(bookDetails.ratings[0]){
        bookDetails.ratings.map((eachitem)=>rating=rating+parseInt(eachitem.rating));
        rating=parseInt(rating/bookDetails.ratings.length);
    }
    let ratingStarsArray=[];
    for(let i=0;i<rating;i++){
        ratingStarsArray.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    for(let i=0;i<5-rating;i++){
        ratingStarsArray.push(<i key={5-i} className="fa-regular fa-star"></i>);
    }
    return(
        loading?<Preloader/>:(
        <div className='container-fluid content'>
            <div className='row'>
                <div className='col-12 headingBar mb-5'>
                    <h4>Book Information</h4>
                </div>
                <div className='col-md-4 col-12 imgDiv'>
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
                             <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Status :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{bookDetails.status}</p>
                            </div>
                            <div className='col-md-2 col-4'>
                                <p className='contentHeading'>Rating :</p>
                            </div>
                             <div className='col-md-10 col-7'>
                                <p>{ratingStarsArray}<Link to={`/ratings/${bookid}`} className="ms-3">All ratings</Link></p>
                            </div>
                            <div className='d-flex justify-content-start mb-5 mb-md-0'>
                            {applyButton}
                            <button className='mt-3 rate-btn ms-4' onClick={() => setModalShow(true)}>Rate Book</button>
                            <RatingModel
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                bookid={bookid}
                            />
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
