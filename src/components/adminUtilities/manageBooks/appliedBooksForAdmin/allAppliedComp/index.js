import '../../../manageBooks/index.css';
import { Link } from 'react-router-dom';
const AllAppliedComp=(props)=>{
    const {bookDetails}=props;
    const {bookid,title,status,appliedby}=bookDetails;
    return(
        <div className='container-fluid appliedBookElement mb-3'>
            <div className='row'>
                <div className='col-3 d-md-none adminAppliedbookHeading'>Book ID :</div>
                <div className='col-9 col-md-3'>
                <Link className='appliedBookLink' to={`../bookDetails/${bookid}`}>{bookid}</Link>
                </div>
                <div className='col-3 d-md-none adminAppliedbookHeading'>Title :</div>
                <div className='col-9 col-md-4'>{title}</div>
                <div className='col-3 d-md-none adminAppliedbookHeading'>Status :</div>
                <div className='col-9 col-md-2 statusColorGreen'>{status}</div>
                <div className='col-3 d-md-none adminAppliedbookHeading'>Applied By :</div>
                <div className='col-9 col-md-3'>{appliedby}</div>
            </div>
        </div>
    )
}
export default AllAppliedComp;