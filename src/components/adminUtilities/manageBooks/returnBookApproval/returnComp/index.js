import { Link } from "react-router-dom";
import '../../../manageBooks/index.css';
const serverURL = process.env.REACT_APP_SERVER_URL;

const ReturnComp=(props)=>{
    const {bookDetails,approveReturnBook}=props;
    const{bookid,imageurl,title,author,status,language,appliedby}=bookDetails;
    const approveReturn=()=>{
        approveReturnBook(bookid);
    }
    const imageSource=(imageurl.includes('cloudinary'))?imageurl:`${serverURL}/uploads/books/${imageurl}`;
    return(
        <div className="singleBookDiv container">
            <div className="row">
                <div className="col-3 appliedImageDiv">
                    <img src={imageSource} className="appliedBookImg" alt="book image"></img>
                </div>
                <div className="col-6 appliedContentDiv">
                    <p><span className="appliedBookContent">Title&nbsp;:&nbsp;</span><span className='contentValues'>{title}</span></p>
                    <p><span className="appliedBookContent">Author&nbsp;:&nbsp;</span><span className='contentValues'>{author}</span></p>
                    <p><span className="appliedBookContent">Language&nbsp;:&nbsp;</span><span className='contentValues'>{language}</span></p>
                    <p><span className="appliedBookContent">Status&nbsp;:&nbsp;</span><span className='contentValues'>{status}</span></p>
                    <p><span className="appliedBookContent">Applied By&nbsp;:&nbsp;</span><span className='contentValues'>{appliedby}</span></p>
                </div>
                <div className="appliedButtonDiv col-12 col-md-3 d-md-flex flex-row flex-md-column">
                    <button className="btn btn-success" onClick={approveReturn}><b>Approve</b></button>
                    <Link to={`/bookDetails/${bookid}`}><button className="btn btn-primary"><b>View</b></button></Link>                 </div>
            </div>
        </div>
    )
}
export default ReturnComp;