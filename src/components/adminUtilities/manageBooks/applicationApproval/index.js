import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../index.css';
import ApprovalComp from './approvalComp';
import ResultsNotFound from '../../../resultsNotFound';
import Preloader from '../../../loader';
import Cookies from 'js-cookie';
const serverURL = process.env.REACT_APP_SERVER_URL;
const ApproveBooks=()=>{
  const navigate=useNavigate();
  const jwtToken=Cookies.get("jwtToken");
  const [booksInfo,setBooksInfo]=useState([]);
  const [searchText,setSearchText]=useState("");
  const [count,setCount]=useState(0);
  const [loading,setLoading]=useState(false);
  const searchChange=(e)=>{
    setSearchText(e.target.value);
  }
  const approveBook= async (bookId,appliedBy)=>{
    setLoading(true);
     try {
            const response=await fetch(`${serverURL}/updateBookStatus/${bookId}`,{
                                        method:"PUT",
                                        headers:{
                                            "Content-Type":"application/json",
                                            Accept:"application/json",
                                            authentication:`Bearer ${jwtToken}`
                                        },
                                        body:JSON.stringify({
                                          status:"applied",
                                          appliedBy:appliedBy
                                        })
                                      })

            if (response.ok){
                Swal.fire({
                        title: 'Success!',
                        text: 'Book Approved Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                        })
            }
            else{
                Swal.fire({
                        title: 'error!',
                        text:'internal server Error',
                        icon: 'error',
                        confirmButtonText: 'OK'
                        })
            }
          } 
            catch (error) {
                    Swal.fire({
                            title: 'error!',
                            text: 'internal server Error',
                            icon: 'error',
                            confirmButtonText: 'OK'
                            })
            }
            setLoading(false)
            navigate('/approvalBooks');
            setCount(count+1);
  }
  const rejectBook= async (bookId,appliedBy)=>{
    setLoading(true);
     try {
            const response=await fetch(`${serverURL}/updateBookStatus/${bookId}`,{
                                        method:"PUT",
                                        headers:{
                                            "Content-Type":"application/json",
                                            Accept:"application/json",
                                            authentication:`Bearer ${jwtToken}`
                                        },
                                        body:JSON.stringify({
                                          status:"available",
                                          appliedBy:""
                                        })
                                      })

            if (response.ok){
                Swal.fire({
                        title: 'Success!',
                        text: 'Book Approved Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                        })
            }
            else{
                Swal.fire({
                        title: 'error!',
                        text:'internal server Error',
                        icon: 'error',
                        confirmButtonText: 'OK'
                        })
            }
          } 
            catch (error) {
                    Swal.fire({
                            title: 'error!',
                            text: 'internal server Error',
                            icon: 'error',
                            confirmButtonText: 'OK'
                            })
            }
            setLoading(false)
            navigate('/approvalBooks');
            setCount(count+1);
  }
        useEffect(()=>{
             const getBooksData=async()=>{
              setLoading(true);
              try {
                 const booksResponse=await fetch(`${serverURL}/booksList`);
                 const booksInformation=await booksResponse.json();
                 const filteredBooks=booksInformation.filter((eachItem)=>eachItem.status==="application-pending"&&eachItem.title.includes(searchText));
                 setBooksInfo(filteredBooks);
              } catch (error) {
                  Swal.fire({
                      title: 'error!',
                      text: 'something went wrong',
                      icon: 'error',
                      confirmButtonText: 'OK'
                      })
              }
            }
            getBooksData();
            setLoading(false);
        },[count,searchText])
        return(
            <div className='approveBooksDiv'>
              <h4>Application Approvals</h4>
              <div className='d-flex justify-content-end me-1 me-md-5'>
                    <label><i className="fa-solid fa-magnifying-glass"></i>&nbsp;<b>search:</b></label>
                    <input type='search' onChange={searchChange} name='search' value={searchText} placeholder='Search By Email ID'></input>
                </div>
                 {loading?(<Preloader/>):((booksInfo[0]===undefined)?<ResultsNotFound/>:booksInfo.map((eachBook)=><ApprovalComp approveBook={approveBook} rejectBook={rejectBook} bookDetails={eachBook} key={eachBook.bookId}/>))}
            </div>
        )
      }
export default ApproveBooks;