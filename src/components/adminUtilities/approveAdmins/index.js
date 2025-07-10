import StudentInfoDisplay from '../studentsInfo/studentInfoComp';
import Preloader from '../../loader';
import { useState ,useEffect} from 'react';
import ResultsNotFound from '../../resultsNotFound';
import Swal from 'sweetalert2';
const ApproveAdmins=()=>{
  const [usersInfo,setUsersInfo]=useState([]);
  const [searchText,setSearchText]=useState("");
  const [loading,setLoading]=useState(false);

     const searchChange=(e)=>{
      setSearchText(e.target.value);
    }
      useEffect(
            ()=>{
                setLoading(true);
                const getUsers=async()=>{
                    try {
                        const response=await fetch('http://localhost:5000/userList');
                        const userList=await response.json();
                        const adminList=userList.filter((eachItem)=>eachItem.role==='admin'&&eachItem.status==='blocked');
                        const filteredAdminList=adminList.filter((eachItem)=>eachItem.email.includes(searchText));
                        setUsersInfo(filteredAdminList);
                    } catch (error) {
                            Swal.fire({
                                title: 'error!',
                                text: 'something went worng',
                                icon: 'error',
                                confirmButtonText: 'OK'
                                })                        
                    }
                }
                getUsers();
                setLoading(false);
            },[searchText]
            );
    return(
        loading?<Preloader/>:<div className='container-fluid'>
            <div className='row p-none'>
                <div className='col-12 p-none'>
                    <div className='container-fluid'>
                        <div className='searchFieldStudentInfo my-1 d-flex'>
                                <h4 className='studentInfoHeading d-none d-md-block'>Approve Admins</h4>
                                <div>
                                    <label><i className="fa-solid fa-magnifying-glass"></i>&nbsp;<b>search:</b></label>
                                    <input type='search' onChange={searchChange} name='search' value={searchText} placeholder='Search By Email ID'></input>
                                </div>
                        </div>                        
                        <div className='row header-display adminAppliedbookDiv'>
                            <div className='col-12 d-md-none adminAppliedbookHeading'>Approve Admins</div>
                            <div className='col-md-3 d-none d-md-flex'>
                                <h6 className='adminAppliedbookHeading'>Email ID</h6>
                            </div>
                             <div className='col-md-3 d-none d-md-flex'>
                                <h6 className='adminAppliedbookHeading'>Name</h6>
                            </div>
                             <div className='col-md-1 d-none d-md-flex'>
                                <h6 className='adminAppliedbookHeading'>gender</h6>
                            </div>
                            <div className='col-md-2 d-none d-md-flex'>
                                <h6 className='adminAppliedbookHeading'>Mobile</h6>
                            </div>
                            <div className='col-md-3 d-none d-md-flex'>
                                <h6 className='adminAppliedbookHeading'>Address</h6>
                            </div>
                        </div>
                        
                        {(usersInfo[0]===undefined)?<ResultsNotFound/>:usersInfo.map((eachItem)=> <StudentInfoDisplay  studentInfo={eachItem} roleDetails="adminDetails" key={eachItem.email}/>)}
                    </div>
                </div>
            </div>
        </div>)
}
export default ApproveAdmins;