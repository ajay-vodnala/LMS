import './index.css';
import { useState,useEffect } from 'react';
import BooksTable from '../booksTable';
import Preloader from '../loader/index';
import ResultsNotFound from '../resultsNotFound';
import Swal from 'sweetalert2';
const serverURL = process.env.REACT_APP_SERVER_URL;
const tabItems=[
                {
                    tabId:"all",
                },
                {
                    tabId:"available",
                },
                {
                    tabId:"applied",
                },
                 {
                    tabId:"pending",
                }
               ]
const Home=()=>{
    const [booksInfo,setBooksInfo]=useState([]);
    const [activeTabId,setActiveTabId]=useState(tabItems[0].tabId);
    const [searchText,setsearchText]=useState('');
    const [count,setCount]=useState(0);
    const [loading,setLoading]=useState(false);
    //-----------------------tablist filter starts----------------------------------

    const filterAll=()=>{
        setActiveTabId(tabItems[0].tabId)
        setCount(count+1);
    }
    const filterAvailable=()=>{
        setActiveTabId(tabItems[1].tabId)
        setCount(count+1);
    } 
    const filterApplied=()=>{
        setActiveTabId(tabItems[2].tabId)
        setCount(count+1);
    }
    const filterPending=()=>{
        setActiveTabId(tabItems[3].tabId)
        setCount(count+1);
    }
    const activeTabAll=(activeTabId===tabItems[0].tabId)?"activeFilterTabBtn":null;
    const activeTabAvailable=(activeTabId===tabItems[1].tabId)?"activeFilterTabBtn":null;
    const activeTabApplied=(activeTabId===tabItems[2].tabId)?"activeFilterTabBtn":null;
    const activeTabPending=(activeTabId===tabItems[3].tabId)?"activeFilterTabBtn":null;
    //-----------------------tablist filter ends-------------------------------------

    //-----------------------search filter starts----------------------------------

    const searchChange=(e)=>{
       setsearchText(e.target.value);
    }

    //-----------------------search filter starts----------------------------------

         useEffect(
                ()=>{
                    setLoading(true);
                    const getBooks=async()=>{
                        try {
                            const response=await fetch(`${serverURL}/booksList`);
                            const BooksData=await response.json();
                             if(activeTabId==="all"){
                                    const filteredArray=BooksData.filter((eachItem)=>eachItem.title.includes(searchText)||eachItem.author.includes(searchText)||eachItem.department.includes(searchText)||eachItem.location.includes(searchText)||eachItem.language.includes(searchText));
                                    setBooksInfo(filteredArray);
                                }else{
                                    const filteredArray=BooksData.filter((eachItem)=>eachItem.status.includes(activeTabId)&&(eachItem.title.includes(searchText)||eachItem.author.includes(searchText)||eachItem.department.includes(searchText)||eachItem.location.includes(searchText)||eachItem.language.includes(searchText)));
                                    setBooksInfo(filteredArray);
                                }
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
                },[searchText,count]
                )
         return(
            loading?<Preloader/>:<div className='homeDiv'>
              <div className='filterDiv flex-md-row flex-column'>
                <div className="tabItemBtns">
                    <button className={`filterTabBtn ${activeTabAll}`} onClick={filterAll} >All</button>
                    <button className={`filterTabBtn ms-md-4 ${activeTabAvailable}`} onClick={filterAvailable} >Available</button>
                    <button className={`filterTabBtn ms-md-4 ${activeTabApplied}`} onClick={filterApplied} >Applied</button>
                    <button className={`filterTabBtn ms-md-4 ${activeTabPending}`} onClick={filterPending} >Pending</button>
                </div>
                <div className='searchField'>
                  <label><i className="fa-solid fa-magnifying-glass"></i>&nbsp;<b>search:</b></label>
                  <input type='search' onChange={searchChange} name='search' value={searchText} placeholder='Search By Title/author/department/location...'></input>
                </div>
              </div>
              {(booksInfo[0]===undefined)?<ResultsNotFound/>:<BooksTable booksList={booksInfo}/>}
            </div>
                )
    }
   
export default Home;