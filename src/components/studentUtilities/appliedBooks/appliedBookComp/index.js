import { Link } from "react-router-dom";
const serverURL = process.env.REACT_APP_SERVER_URL;
const AppliedBookComp=(props)=>{
    const {bookDetails,removeBook}=props;
    const{bookid,imageurl,title,author,status,language,appliedby}=bookDetails;
    const removeBookFun=()=>{
        removeBook(bookid,statusValue,appliedbyValue,alertText);
    }
    const buttonText=(status==="applied")?"Return":"Remove";
    const statusValue=(status==="applied")?"return-pending":"available";
    const statusStyle=(status==="applied")?"statusColorGreen":"statusColorRed";
    const appliedbyValue=(status==="applied")?appliedby:" ";
    const alertText=(status==="applied")?"Book Return Successful wait for approval":"Book removed Successfully";
    const imageSource=(imageurl.includes('cloudinary'))?imageurl:`${serverURL}/uploads/books/${imageurl}`;
    return(
        <div className="singleBookDiv container">
            <div className="row">
                <div className="col-3 appliedImageDiv">
                    <img src={imageSource} className="appliedBookImg" alt="book image"></img>
                </div>
                <div className="col-6 appliedContentDiv">
                    <p><span className="appliedBookContent">Title&nbsp;:&nbsp;</span><b>{title}</b></p>
                    <p><span className="appliedBookContent">Author&nbsp;:&nbsp;</span>{author}</p>
                    <p><span className="appliedBookContent">Language&nbsp;:&nbsp;</span>{language}</p>
                    <p><span className="appliedBookContent">Status&nbsp;:&nbsp;</span><span className={statusStyle}><b>{status}</b></span></p>
                </div>
                <div className="appliedButtonDiv col-12 col-md-3 d-md-flex flex-row flex-md-column">
                    <button className="btn btn-danger" onClick={removeBookFun}><b>{buttonText}</b></button>
                    <Link to={`/bookDetails/${bookid}`}> <button className="btn btn-primary"><b>View</b></button></Link>
                </div>
            </div>
        </div>
    )
}
export default AppliedBookComp;