import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import '../index.css';
import ReturnComp from './returnComp';
import Preloader from '../../../loader';
import ResultsNotFound from '../../../resultsNotFound';
const serverURL = process.env.REACT_APP_SERVER_URL;
const ReturnBooks=()=>{
  const jwtToken=Cookies.get("jwtToken");
   const navigate=useNavigate();
    const [booksInfo,setBooksInfo]=useState([]);
    const [count,setCount]=useState(0);
    const [searchText,setSearchText]=useState("");
    const [loading,setLoading]=useState(false)
     const searchChange=(e)=>{
         setSearchText(e.target.value);
      }
    const approveReturnBook= async (id)=>{
      setLoading(true);
       try {
              const response=await fetch(`${serverURL}/updateBookStatus/${id}`,{
                                          method:"PUT",
                                          headers:{
                                              "Content-Type":"application/json",
                                              Accept:"application/json",
                                              authentication:`Bearer ${jwtToken}`
                                          },
                                          body:JSON.stringify({
                                            status:'available',
                                            appliedby:""
                                          })
                                        })
  
              if (response.ok){
                  Swal.fire({
                          title: 'Success!',
                          text: 'Book Return Approval Success',
                          icon: 'success',
                          confirmButtonText: 'OK'
                          })
              }
              else{
                  Swal.fire({
                          title: 'error!',
                          text: response.statusText('internal server Error'),
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
              setCount(count+1);
              navigate('/returnapproval');
    }
     useEffect(()=>{
           const getBooksData=async()=>{
            setLoading(true);
            try {
               const booksResponse=await fetch(`${serverURL}/booksList`);
               const booksInformation=await booksResponse.json();
               const filteredBooks=booksInformation.filter((eachItem)=>eachItem.status==="return-pending"&&eachItem.title.includes(searchText));
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
              <h4>Return Approvals</h4>
              <div className='d-flex justify-content-end me-1 me-md-5'>
                    <label><i className="fa-solid fa-magnifying-glass"></i>&nbsp;<b>search:</b></label>
                    <input type='search' onChange={searchChange} name='search' value={searchText} placeholder='Search By Book Title'></input>
                </div>
                 {loading?(<Preloader/>):((booksInfo[0]===undefined)?<ResultsNotFound/>:booksInfo.map((eachBook)=><ReturnComp bookDetails={eachBook} approveReturnBook={approveReturnBook} key={eachBook.bookid}/>))}
            </div>
        )
    }

export default ReturnBooks;