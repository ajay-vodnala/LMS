import ManageBooksDisplay from '../manageBooksDisplayComp';
import '../index.css';
import { useState ,useEffect} from 'react';
import Preloader from '../../../loader';
import Swal from 'sweetalert2';
import ResultsNotFound from '../../../resultsNotFound';
const serverURL = process.env.REACT_APP_SERVER_URL;
const UpdateBook=()=>{
  const [booksInfo,setBooksInfo]=useState([]);
  const [searchText,setSearchText]=useState("");
  const [loading,setLoading]=useState(false);
     const searchChange=(e)=>{
      setSearchText(e.target.value);
    }
     useEffect(
        ()=>{
            setLoading(true);
            const getBooks=async()=>{
                try {
                    const response=await fetch(`${serverURL}/booksList`);
                    const BooksData=await response.json();
                    const filteredUpdateBooks=BooksData.filter((eachItem)=>eachItem.bookId.includes(searchText)||eachItem.title.includes(searchText));
                    setBooksInfo(filteredUpdateBooks);
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
        );

    return(
        loading?<Preloader/>:
        <div className='container-fluid'>
            <div className='row p-none'>
                <div className='col-12 p-none'>
                    <div className='container-fluid'>
                        <div className='row header-display adminAppliedbookDiv'>
                            <div className='col-12 d-md-none adminAppliedbookHeading'>Update Book</div>
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
                            <div className='col-md-2 d-none d-md-flex'>
                            </div>
                        </div>
                         <div className='searchFieldManageBooks mt-2 d-flex'>
                                <label><i className="fa-solid fa-magnifying-glass"></i>&nbsp;<b>search:</b></label>
                                <input type='search' onChange={searchChange} name='search' value={searchText} placeholder='Search By Book Id'></input>
                        </div>
                        {(booksInfo[0]===undefined)?<ResultsNotFound/>:booksInfo.map((eachItem)=> <ManageBooksDisplay displayText="Update" bookDetails={eachItem} btnColor="warning" key={eachItem.bookId}/>)}
                    </div>
                </div>
            </div>
        </div>)
}
export default UpdateBook;