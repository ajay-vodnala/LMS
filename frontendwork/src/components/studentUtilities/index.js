import './index.css';
import {Link} from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'js-cookie';
let expand=null;
 const StudentUtilities=()=>{
     const logout=()=>{
        Cookies.remove("jwtToken");
        Cookies.remove("role");
      }
    return(
        <NavDropdown
            title="Student Panel"
            id={`offcanvasNavbarDropdown-expand-${expand}`}
          >
            <Link to="/appliedBooks" className={`option  nav-link-opt option2`}>Applied&nbsp;Books</Link>
            <Link to="/applyBook" className='option  nav-link-opt option2'>Apply&nbsp;Book</Link>
            <Link to="/editProfile" className='option  nav-link-opt option2'>Edit&nbsp;Profile</Link>
            <Link to="/returnBook" className='option  nav-link-opt option2'>Return&nbsp;Book</Link>
            <Link className='option nav-link-opt option2' onClick={logout}>Log&nbsp;out</Link>
        </NavDropdown>
    )
}
export default StudentUtilities;