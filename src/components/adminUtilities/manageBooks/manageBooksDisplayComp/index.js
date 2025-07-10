import { Link } from 'react-router-dom';
import '../index.css';
const ManageBooksDisplay=(props)=>{
    const {manageFun,displayText,bookDetails,btnColor}=props;
    const {bookId,title,language,status}=bookDetails;
    const fun_manage=()=>{
        manageFun(bookId);
    }
    const statusColor=(status==="available")?"statusColorGreen":"statusColorRed";
    let button=null;
    if(displayText==="Delete"){
        button=<button className={`btn btn-${btnColor}`} onClick={fun_manage}>{displayText}</button>
    }
    else{
        button=<Link to={`/updateBook/${bookId}`}><button className={`btn btn-${btnColor}`}>{displayText}</button></Link>
    }
    return(
        <div className='container-fluid mt-4 bookItem'>
            <div className='row'>
                <div className='col-12'>
                    <div className='container-fluid'>
                        <div className='row header-display'>
                            <div className='col-md-3 appliedBookElement'>
                                <p><span className='d-md-none updateHeading me-3'>Book ID :</span><Link className='appliedBookLink' to={`../bookDetails/${bookId}`}>{bookId}</Link></p>
                            </div>
                             <div className='col-md-3 appliedBookElement'>
                                <p><span className='d-md-none updateHeading me-3'>Book Title :</span>{title}</p>
                            </div>
                             <div className='col-md-2 appliedBookElement'>
                                <p><span className='d-md-none updateHeading me-3'>Book language :</span>{language}</p>
                            </div>
                            <div className='col-md-2 appliedBookElement'>
                                <p><span className="d-md-none updateHeading me-3">Book Status :</span><span className={`${statusColor}`}>{status}</span></p>
                            </div>
                            <div className='col-md-2'>
                                {button}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ManageBooksDisplay;