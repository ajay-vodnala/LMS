import UserInfoDisplay from './userInfoComp';
import Preloader from '../../../loader';
import '../index.css';
import { useState ,useEffect} from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import ResultsNotFound from '../../../resultsNotFound';
const serverURL = process.env.REACT_APP_SERVER_URL;
const DeleteUser=()=>{
    const jwtToken=Cookies.get("jwtToken");
const [usersInfo,setUsersInfo]=useState([]);
const [count,setCount]=useState(0);
const [searchText,setSearchText]=useState("");
const [loading,setLoading]=useState(false);
const [deleteRole,setDeleteRole]=useState("Admins");
const rolePath=(deleteRole==="Admins")?"adminDetails":"studentdetails";
const activeTab=(deleteRole==="Admins")?"activeFilterTabBtn":null;
const activeTab2=(deleteRole==="Students")?"activeFilterTabBtn":null;
     const searchChange=(e)=>{
      setSearchText(e.target.value);
    }

    const filterAdmin=()=>{
        setDeleteRole("Admins");
    }

     const filterStudent=()=>{
        setDeleteRole("Students");
    }

    const deleteUser=async(id)=>{
        try {
            setLoading(true);
            const response =await fetch(`${serverURL}/deleteUser/${id}`,{
                method:"DELETE"});
                if (response.ok){
                    Swal.fire({
                            title: 'success!',
                            text: 'User Deleted Successfully',
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
                            text: "something went worng",
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
                let list;
                const getUsers=async()=>{
                    try {
                        const response=await fetch(`${serverURL}/userList`);
                        const userList=await response.json();
                        const emailResponse=await fetch(`${serverURL}/getEmail`,{
                            mathod:"GET",
                            headers:{
                                authentication:`Bearer ${jwtToken}`
                            }
                        });
                        const recieveEmail=await emailResponse.json();
                        if(deleteRole==="Admins"){
                             list=userList.filter((eachItem)=>eachItem.role==="admin"&&eachItem.email!=recieveEmail.email);
                        }else{
                             list=userList.filter((eachItem)=>eachItem.role==="student"); 
                        }
                        const filteredStudentList=list.filter((eachItem)=>eachItem.email.includes(searchText));
                        setUsersInfo(filteredStudentList);
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
            },[searchText,deleteRole,count]
            );
    return(
        loading?<Preloader/>:<div className='container-fluid'>
            <div className='row p-none'>
                <div className='col-12 p-none'>
                    <div className='container-fluid'>
                        <div className='searchFieldStudentInfo my-1 d-flex'>
                                <h4 className='studentInfoHeading d-none d-md-block'>Delete {deleteRole}</h4>
                        </div>
                        <div className='d-flex flwx-row justify-content-between p-3'>
                            <div>
                                <button className={`filterTabBtn ${activeTab}`} onClick={filterAdmin} >Admins</button>
                                <button className={`filterTabBtn ms-md-4 ${activeTab2}`} onClick={filterStudent} >Students</button>
                            </div>
                            <div>
                                <label><i className="fa-solid fa-magnifying-glass"></i>&nbsp;<b>search:</b></label>
                                <input type='search' onChange={searchChange} name='search' value={searchText} placeholder='Search By Email ID'></input>
                            </div>                                    
                        </div>                        
                        <div className='row header-display adminAppliedbookDiv'>
                            <div className='col-12 d-md-none adminAppliedbookHeading'>Delete {deleteRole}</div>
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
                            <div className='col-md-1 d-none d-md-flex'>
                                <h6 className='adminAppliedbookHeading'>Status</h6>
                            </div>
                            <div className='col-md-2 d-none d-md-flex'>
                                
                            </div>
                        </div>
                        {(usersInfo[0]===undefined)?<ResultsNotFound/>:usersInfo.map((eachItem)=> <UserInfoDisplay  userInfo={eachItem} roleDetails={rolePath} deleteUser={deleteUser} key={eachItem.email}/>)}
                    </div>
                </div>
            </div>
        </div>)
}
export default DeleteUser;