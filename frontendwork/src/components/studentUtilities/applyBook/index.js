import ApplyBookComp from "./applyBookComp";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Preloader from "../../loader";
import ResultsNotFound from "../../resultsNotFound";
const ApplyBook=()=>{
    const navigate=useNavigate();    
    const jwtToken=Cookies.get("jwtToken");
    const [booksInfo,setBooksInfo]=useState([]);
    const [searchText,setSearchText]=useState("");
    const [count,setCount]=useState(0);
    const availableBooks=booksInfo.filter((eachItem)=>eachItem.status==="available");
    const [loading,setLoading]=useState(false);

    const handleChange=(e)=>{
        setSearchText(e.target.value);
    }

    const applyBook= async (bookId)=>{
          setLoading(true);
           try {
                  const response=await fetch(`http://localhost:5000/updateBookStatus/${bookId}`,{
                                              method:"PUT",
                                              headers:{
                                                  "Content-Type":"application/json",
                                                  Accept:"application/json",
                                                  authentication:`Bearer ${jwtToken}`
                                              },
                                              body:JSON.stringify({status:"application-pending",
                                                appliedBy:"email"
                                              })
                                            })
      
                  if (response.ok){
                      Swal.fire({
                              title: 'Success!',
                              text: 'Book Applied Successfully \n Wait for Approval',
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
                                  text: error,
                                  icon: 'error',
                                  confirmButtonText: 'OK'
                                  })
                  }
                  setLoading(false)
                  setCount(count+1);
                  navigate('/applyBook');
        }
     useEffect(
            ()=>{
                setLoading(true);
                const getAppliedBooks=async()=>{
                    try {
                        const response=await fetch("http://localhost:5000/booksList");
                        const BooksData=await response.json();
                        const searchFilterBooks=BooksData.filter((eachItem)=>eachItem.bookId.includes(searchText)||eachItem.title.includes(searchText));
                        setBooksInfo(searchFilterBooks);
                    } catch (error) {
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
        loading?<Preloader/>:(
            <div className="container-fluid">
                <div className="d-flex flex-column flex-md-row justify-content-end justify-content-md-between">
                    <h4 className="adminAppliedbookName ms-5">Apply Book</h4>
                    <div className='searchField me-5 mt-3 ms-5 ms-md-0'>
                    <label><i className="fa-solid fa-magnifying-glass"></i>&nbsp;<b>search:</b></label>
                    <input type='search' onChange={handleChange} name='search' value={searchText} placeholder='Search By title / Book Id'></input>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-12">
                        {(availableBooks[0]===undefined)?<ResultsNotFound/>:availableBooks.map((eachItem)=><ApplyBookComp applyBook={applyBook} bookInfo={eachItem} key={eachItem.bookId}/>)}
                    </div>
                </div>
            </div>
        )
    )
}
export default ApplyBook;