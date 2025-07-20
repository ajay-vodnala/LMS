import './index.css';
import {Link} from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'js-cookie';
let expand=null;
 const AdminUtilities=()=>{
    return(
        <NavDropdown
                    title="Admin Panel"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <Link to="/addBook" className='option nav-link-opt option2'>Add&nbsp;Book</Link>
                    <Link to="/deleteBook" className='option nav-link-opt option2'>Delete&nbsp;Book</Link>
                    <Link to="/studentsInfo" className='option nav-link-opt option2'>Students&nbsp;Info</Link>
                    <Link to="/adminsInfo" className='option nav-link-opt option2'>Admin's&nbsp;Info</Link>
                    <Link to="/approveAdmins" className='option nav-link-opt option2'>Approve&nbsp;Admins</Link>
                    <Link to="/updateBooksList" className='option nav-link-opt option2'>Update&nbsp;Book</Link>
                    <Link to="/adminUtilities/appliedBooks" className='option nav-link-opt option2'>Applied&nbsp;Books</Link>
                    <Link to="/approvalbooks" className='option nav-link-opt option2'>Applied&nbsp;Approvals</Link>
                    <Link to="/returnApproval" className='option nav-link-opt option2'>Return&nbsp;Approvals</Link>
                    <Link to="/deleteUser" className='option nav-link-opt option2'>Delete&nbsp;User</Link>
                    <Link to="/editProfile" className='option nav-link-opt option2'>Edit&nbsp;Profile</Link>
                  </NavDropdown>
    )
}
export default AdminUtilities;

