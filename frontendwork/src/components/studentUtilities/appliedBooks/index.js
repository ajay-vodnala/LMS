import { useState,useEffect } from 'react';
import './index.css';
import AppliedBookComp from './appliedBookComp';
import ResultsNotFound from '../../resultsNotFound';
import Preloader from '../../loader';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
const AppliedBooks=()=>{
    const jwtToken=Cookies.get("jwtToken");
    const [booksInfo,setbooksInfo]=useState([]);
    const [searchText,setSearchText]=useState("");
    const [count,setCount]=useState(0);
    const [loading,setLoading]=useState(false)
    const searchChange=(e)=>{
      setSearchText(e.target.value);
    }
    const appliedBooksList=booksInfo.filter((eachItem)=>eachItem.status==="applied"||eachItem.status==="application-pending");
    const removeBook= async (bookId,statusValue,appliedByValue,alertText)=>{
      setLoading(true);
       try {
              const response=await fetch(`http://localhost:5000/updateBookStatus/${bookId}`,{
                                          method:"PUT",
                                          headers:{
                                              "Content-Type":"application/json",
                                              Accept:"application/json",
                                              authentication:`Bearer ${jwtToken}`
                                          },
                                          body:JSON.stringify({
                                            status:statusValue,
                                            appliedBy:appliedByValue
                                          })
                                        })
  
              if (response.ok){
                  Swal.fire({
                          title: 'Success!',
                          text: alertText,
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
              setCount(count+1);
    }
    useEffect(
      ()=>{
        setLoading(true);
        const getAppliedBooks=async()=>{
          const options={
            method:"GET",
            headers:{
              "Content-Type":"application/json",
              "Accept":"application/json",
              "Authentication":`Bearer ${jwtToken}`
            }
          }
          const response=await fetch("http://localhost:5000/studentUtilities/appliedBooks",options);
          const BooksData=await response.json();
          const filteredAppliedBooks=BooksData.filter((eachItem)=>eachItem.bookId.includes(searchText)||eachItem.title.includes(searchText));
          if(response.ok){
            setbooksInfo(filteredAppliedBooks);
          }else{
             Swal.fire({
                        title: 'error!',
                        text: 'something went worng',
                        icon: 'error',
                        confirmButtonText: 'OK'
                        })
          }
        }
        getAppliedBooks();
        setLoading(false);
      },[count,searchText]
    )
        return(
          loading?<Preloader/>:
            <div className='appliedBooksDiv'>
                <h4 className="adminAppliedbookName ms-5">Applied Books</h4>
                <div className='searchFieldManageBooks mt-2 d-flex'>
                                <label><i className="fa-solid fa-magnifying-glass"></i>&nbsp;<b>search:</b></label>
                                <input type='search' onChange={searchChange} name='search' value={searchText} placeholder='Search By Book Id/book Title'></input>
                        </div>
                 {(appliedBooksList[0]===undefined)?<ResultsNotFound/>:(appliedBooksList.map((eachBook)=><AppliedBookComp bookDetails={eachBook} removeBook={removeBook} key={eachBook.bookId}/>))}
            </div>
        )
    }
export default AppliedBooks;