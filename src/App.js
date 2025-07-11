import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router';
import { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
import Home from './components/home/index';
import Profile from './components/profile/index';
import BookDetails from './components/bookDetails/index';
import StudentDetails from './components/studentDetails/index';
import AllAppliedBooks from './components/adminUtilities/manageBooks/appliedBooksForAdmin';
import Contact from './components/contact/index';
import NotFound from './components/notfound/index';
import ApplyBook from './components/studentUtilities/applyBook';
import Login from './components/login';
import Register from './components/register';
import EditProfile from './components/studentUtilities/editProfile';
import DeleteBook from './components/adminUtilities/manageBooks/deleteBook';
import ReturnBook from './components/studentUtilities/returnBook';
import UpdateBookForm from './components/adminUtilities/manageBooks/updateBook/updateBookForm';
import UpdateBook from './components/adminUtilities/manageBooks/updateBook';
import ManageBooks from './components/adminUtilities/manageBooks/index';
import AdminInfo from './components/adminUtilities/adminInfo';
import AdminDetails from './components/adminDetails';
import StudentsInfo from './components/adminUtilities/studentsInfo/index';
import AppliedBooks from './components/studentUtilities/appliedBooks/index';
import ReturnBooks from './components/adminUtilities/manageBooks/returnBookApproval';
import AddBook from './components/adminUtilities/manageBooks/addBook';
import ApproveBooks from './components/adminUtilities/manageBooks/applicationApproval/index';
import Preloader from './components/loader';
import DeleteUser from './components/adminUtilities/manageBooks/deleteAdmin';
import Interface from './components/interface';
import ProtectedRoute from './components/protectedRoute';
import ApproveAdmins from './components/adminUtilities/approveAdmins';
import ProtectedRouteForAdmin from './components/protectedRouteForAdmin';
import ProtectedRouteForStudent from './components/protectedRouteForStudent';
export const App =()=>{
  const [loading,setLoading]=useState(false)
     
      return(
        loading?<Preloader/>:
          <Router>
              <Routes>
                <Route exact path="/dashboard" element={<Interface/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute/>}>
                  <Route exact path="/" element={<Home/>} />
                  <Route element={<ProtectedRouteForStudent/>}>
                      <Route exact path="/appliedBooks" element={<AppliedBooks />} />
                      <Route exact path="/applyBook" element={<ApplyBook/>} />
                      <Route path="/returnBook" element={<ReturnBook/>} />
                  </Route>
                  <Route element={<ProtectedRouteForAdmin/>}>
                      <Route path="/addBook" element={<AddBook />} />
                      <Route path="/deleteBook" element={<DeleteBook/>} />
                      <Route exact path="/approvalBooks" element={<ApproveBooks/>} />
                      <Route exact path="/adminUtilities/appliedBooks" element={<AllAppliedBooks/>} />
                      <Route exact path="/updateBook/:bookId" element={<UpdateBookForm />} />
                      <Route path="/deleteUser" element={<DeleteUser/>} />
                      <Route exact path="/studentsInfo" element={<StudentsInfo />} />
                      <Route exact path="/adminsInfo" element={<AdminInfo />} />
                      <Route exact path="/approveAdmins" element={<ApproveAdmins />} />
                      <Route exact path="/adminDetails/:email" element={<AdminDetails />} /> 
                      <Route exact path="/admin-panel" element={<ManageBooks />} />
                      <Route exact path="/returnapproval" element={<ReturnBooks/>} />
                      <Route path="/updateBooksList" element={<UpdateBook/>} />
                  </Route> 
                  <Route exact path="/profile" element={<Profile />} />
                  <Route exact path="/contact" element={<Contact />} />
                  <Route exact path="/bookDetails/:bookId" element={<BookDetails />} /> 
                  <Route exact path="/studentDetails/:email" element={<StudentDetails />} /> 
                  <Route path="/editProfile" element={<EditProfile/>} />
                  <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
          </Router>

      )
   }
