import ReturnBookComp from "./returnBookComp";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Preloader from "../../loader";
import Cookies from "js-cookie";
import ResultsNotFound from "../../resultsNotFound";
const serverURL = process.env.REACT_APP_SERVER_URL;
const ReturnBook=()=>{
    const jwtToken=Cookies.get("jwtToken");
    const [booksList,setBooksList]=useState([]);
    const appliedFilteredBooks=booksList.filter((eachItem)=>eachItem.status==="applied");
    const [count,setCount]=useState(0);
    const [searchText,setSearchText]=useState("");
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setSearchText(e.target.value);
    }
    const returnBook= async (id)=>{
          setLoading(true);
           try {
                  const response=await fetch(`${serverURL}/updateBookStatus/${id}`,{
                                              method:"PUT",
                                              headers:{
                                                  "Content-Type":"application/json",
                                                  Accept:"application/json",
                                                  authentication:`Bearer ${jwtToken}`
                                              },
                                              body:JSON.stringify({status:"return-pending",
                                                appliedby:""
                                              })
                                            })
      
                  if (response.ok){
                      Swal.fire({
                              title: 'Success!',
                              text: 'Book Return Success',
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
                  navigate('/returnBook');
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
                  const response=await fetch(`${serverURL}/studentUtilities/appliedBooks`,options);
                  const appliedBooksData=await response.json();
                  const searchFilterBooks=appliedBooksData.filter((eachItem)=>eachItem.bookid.includes(searchText)||eachItem.title.includes(searchText));
                  setBooksList(searchFilterBooks)
                  if(response.ok){
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
        loading?<Preloader/>:(
            <div className="container-fluid">
                <h4 className="adminAppliedbookName ms-5">Return Books</h4>
                <div className='searchField me-5 mt-3 ms-5 ms-md-0 d-flex justify-content-end'>
                    <label><i className="fa-solid fa-magnifying-glass"></i>&nbsp;<b>search:</b></label>
                    <input type='search' onChange={handleChange} name='search' value={searchText} placeholder='Search By title / Book Id'></input>
                </div>
                <div className="row">
                    <div className="col-12">
                        {(appliedFilteredBooks[0]===undefined)?<ResultsNotFound/>:appliedFilteredBooks.map((eachItem)=><ReturnBookComp returnBook={returnBook} bookInfo={eachItem} key={eachItem.bookid}/>)}
                    </div>
                </div>
            </div>
        )
    )
}
export default ReturnBook;