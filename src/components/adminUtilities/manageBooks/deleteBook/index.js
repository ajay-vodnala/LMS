import { useState ,useEffect } from 'react';
import Preloader from '../../../loader';
import ManageBooksDisplay from '../manageBooksDisplayComp';
import Swal from 'sweetalert2';
import ResultsNotFound from '../../../resultsNotFound';
import '../index.css';
const serverURL = process.env.REACT_APP_SERVER_URL;
const DeleteBook=()=>{
  const [booksInfo,setBooksInfo]=useState([]);
  const [count,setCount]=useState(0);
  const [searchText,setSearchText]=useState("");
  const searchChange=(e)=>{
        setSearchText(e.target.value);
    }
    const [loading,setLoading]=useState(false);
    const manageFun= async (id)=>{
       try {
                setLoading(true);
                const response =await fetch(`${serverURL}/deleteBook/${id}`,{
                  method:"DELETE"});
                  if (response.ok){
                       Swal.fire({
                                title: 'success!',
                                text: 'Book Deleted successfully',
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
       } catch (error) {
                        Swal.fire({
                                  title: 'error!',
                                  text: error,
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
                        const getBooks=async()=>{
                            try {
                                const response=await fetch(`${serverURL}/booksList`);
                                const BooksData=await response.json();
                                const availableBooks=BooksData.filter((eachItem)=>eachItem.status==="available");
                                const filteredDeleteBooks=availableBooks.filter((eachItem)=>eachItem.bookid.includes(searchText)||eachItem.title.includes(searchText));
                                setBooksInfo(filteredDeleteBooks);
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
                    },[count,searchText]
                    )
    return(
        loading?<Preloader/>:(<div className='container-fluid'>
            <div className='row'>
                <div className='col-12'>
                    <div className='container-fluid'>
                        <div className='row adminAppliedbookDiv'>
                            <div className='col-12 d-md-none adminAppliedbookHeading'>Delete Book</div>
                            <div className='col-md-3 d-none d-md-flex'>
                                <h6 className='adminAppliedbookHeading'>Book ID</h6>
                            </div>
                             <div className='col-md-3 d-none d-md-flex'>
                                <h6 className='adminAppliedbookHeading'>Title</h6>
                            </div>
                             <div className='col-md-2 d-none d-md-flex'>
                                <h6 className='adminAppliedbookHeading'>Book Language</h6>
                            </div>
                            <div className='col-md-2 d-none d-md-flex'>
                                <h6 className='adminAppliedbookHeading'>Book Status</h6>
                            </div>
                            <div className='col-md-2'>
                            </div>
                        </div>
                         <div className='searchFieldManageBooks mt-2 d-flex'>
                                <label><i className="fa-solid fa-magnifying-glass"></i>&nbsp;<b>search:</b></label>
                                <input type='search' onChange={searchChange} name='search' value={searchText} placeholder='Search By Book Id'></input>
                        </div>
                       { (booksInfo[0]===undefined)?<ResultsNotFound/>:(
                        (booksInfo.map((eachItem)=> <ManageBooksDisplay displayText="Delete" bookDetails={eachItem} manageFun={manageFun} btnColor="danger" key={eachItem.bookid}/>)))}
                    </div>
                </div>
            </div>
        </div>)
    )
}
export default DeleteBook;