import { useState,useEffect } from "react";
import AllAppliedComp from "./allAppliedComp";
import Preloader from '../../../loader/index';
import '../../manageBooks/index.css';
import ResultsNotFound from "../../../resultsNotFound";
import Swal from 'sweetalert2';
const AllAppliedBooks=()=>{
    const [booksInfo,setBooksInfo]=useState([]);
    const [loading,setLoading]=useState(false);
    const [searchText,setSearchText]=useState("");
     const searchChange=(e)=>{
      setSearchText(e.target.value);
    }
         useEffect(
            ()=>{
                setLoading(true);
                const getBooks=async()=>{
                    try {
                        const response=await fetch("http://localhost:5000/booksList");
                        const BooksData=await response.json();
                        const appliedBooks=BooksData.filter((eachItem)=>eachItem.status==="applied"||eachItem.status==="application-pending");
                        const filteredAppliedBooks=appliedBooks.filter((eachItem)=>eachItem.bookId.includes(searchText));
                        setBooksInfo(filteredAppliedBooks);
                        console.log(booksInfo)
                    } catch (error) {
                            Swal.fire({
                                title: 'error!',
                                text: 'something went worng',
                                icon: 'error',
                                confirmButtonText: 'OK'
                                })                        
                    }
                }
                getBooks();
                setLoading(false);
            },[searchText]
            )
    return(
        loading?<Preloader/>:
        <div className="container-fluid">
            <h4 className="adminAppliedbookName">Applied Books</h4>
            <div className='searchFieldManageBooks mb-2 d-flex'>
                <label><i className="fa-solid fa-magnifying-glass"></i>&nbsp;<b>search:</b></label>
                <input type='search' onChange={searchChange} name='search' value={searchText} placeholder='Search By Book Id'></input>
            </div>
            <div className="row mb-4 adminAppliedbookDiv">
                <div className='col-md-3 d-none d-md-block adminAppliedbookHeading'>Book ID </div>
                <div className='col-md-4 d-none d-md-block adminAppliedbookHeading'>Title </div>
                <div className='col-md-2 d-none d-md-block adminAppliedbookHeading'>Status </div>
                <div className='col-md-3 d-none d-md-block adminAppliedbookHeading'>Applied By</div>            
            </div>
            {(booksInfo[0]===undefined)?<ResultsNotFound/>:booksInfo.map((eachItem)=><AllAppliedComp bookDetails={eachItem} key={eachItem.bookId}/>)}
        </div>
    )
}
export default AllAppliedBooks;