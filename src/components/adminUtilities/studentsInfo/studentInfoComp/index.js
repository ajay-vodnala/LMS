import '../../manageBooks/index.css';
import { Link } from 'react-router-dom';
const StudentInfoDisplay=(props)=>{
    const {studentInfo,roleDetails}=props;
    const {name,email,gender,mobile,address,status}=studentInfo;
    const linkColor=(status==='blocked')?"red-link":null;
    return(
        <div className='container-fluid mt-4 bookItem'>
            <div className='row'>
                <div className='col-12'>
                    <div className='container-fluid'>
                        <div className='row header-display'>
                            <div className='col-md-3 appliedBookElement'>
                                <p><span className='d-md-none updateHeading me-3'>Email ID :</span><Link className={`appliedBookLink ${linkColor}`} to={`../${roleDetails}/${email}`}>{email}</Link></p>
                            </div>
                             <div className='col-md-3 appliedBookElement'>
                                <p><span className='d-md-none updateHeading me-3'>Name :</span>{name}</p>
                            </div>
                             <div className='col-md-1 appliedBookElement'>
                                <p><span className='d-md-none updateHeading me-3'>Gender :</span>{gender}</p>
                            </div>
                            <div className='col-md-2 appliedBookElement'>
                                <p><span className='d-md-none updateHeading me-3'>Mobile :</span>{mobile}</p>
                            </div>
                            <div className='col-md-3 appliedBookElement'>
                                <p><span className='d-md-none updateHeading me-3'>Address :</span>{address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default StudentInfoDisplay;