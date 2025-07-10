import './index.css'
import {Link} from 'react-router-dom';
import AdminUtilities from '../adminUtilities';
import StudentUtilities from '../studentUtilities';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cookies from 'js-cookie';
/**const Header=()=>{
    return(
        <div className="header">
            <div className='logo'>
                <Logo/>
            </div>
            <div className='menu'>
                <Link to="/" className='option option2'>Home</Link>
                <AdminUtilities/>
                <StudentUtilities/>
                <Link to="/profile" className='option option2'>Profile</Link>
                <Link to="/contact" className='option option2'>Contact</Link>
            </div>
        </div>
    )
}**/

const Header=()=> {
  const UserRole=Cookies.get("role");
  const displayProperty=(UserRole==="admin")?<AdminUtilities/>:<StudentUtilities/>

  return (
    <>
      {["md"].map((expand) => (
        <Navbar key={expand} expand={expand} className="header mb-3">
          <Container fluid>
            <Navbar.Brand className='logo'>LMS</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start justify-content-md-end flex-grow-1 pe-3">
                 <div className='menu'>
                    <Link to="/" className='option option2'>Home</Link>
                    {displayProperty}
                    <Link to="/profile" className='option profile option2'>Profile</Link>
                    <Link to="/contact" className='option profile option2'>Contact&nbsp;Us</Link>
                </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;