import '../../../adminUtilities/manageBooks/index.css';
import { Link } from 'react-router-dom';
const serverURL = process.env.REACT_APP_SERVER_URL;
const ApplyBookComp=(props)=>{
    const {bookInfo,applyBook}=props;
    const{bookid,imageurl,title,author,status,language}=bookInfo;
    const applyBookFun=()=>{
        applyBook(bookid);
    }
    const imageSource=(imageurl.includes('cloudinary'))?imageurl:`${serverURL}/uploads/books/${imageurl}`;
    return(
        <div className="singleBookDiv container">
            <div className="row">
                <div className="col-3 col-md-3 appliedImageDiv">
                    <img src={imageSource} className="appliedBookImg" alt="book image"></img>
                </div>
                <div className="col-6 col-md-6 appliedContentDiv">
                    <p><span className="appliedBookContent">Title&nbsp;:&nbsp;</span><b>{title}</b></p>
                    <p><span className="appliedBookContent">Author&nbsp;:&nbsp;</span>{author}</p>
                    <p><span className="appliedBookContent">Language&nbsp;:&nbsp;</span>{language}</p>
                    <p><span className="appliedBookContent">Status&nbsp;:&nbsp;</span><span className='statusColorGreen'><b>{status}</b></span></p>
                </div>
                <div className="appliedButtonDiv col-12 col-md-3 d-flex flex-row flex-md-column">                    
                    <button className="btn btn-success" onClick={applyBookFun}><b>Apply</b></button>
                    <Link to={`/bookDetails/${bookid}`}><button className="btn btn-primary"><b>View</b></button></Link> 
                </div>
            </div>
        </div>
    )
}
export default ApplyBookComp;