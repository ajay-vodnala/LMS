import '../../../manageBooks/index.css';
const serverURL = process.env.REACT_APP_SERVER_URL;

const ApprovalComp=(props)=>{
    const {bookDetails,approveBook,rejectBook}=props;
    const{bookid,imageurl,title,author,status,language,appliedby}=bookDetails;
    const approveBookFun=()=>{
        approveBook(bookid,appliedby);
    }
    const rejectBookFun=()=>{
        rejectBook(bookid,appliedby);
    }
    const imageSource=(imageurl.includes('cloudinary'))?imageurl:`${serverURL}/uploads/books/${imageurl}`;
    return(
        <div className="singleBookDiv container">
            <div className="row">
                <div className="col-3 appliedImageDiv">
                    <img src={imageSource} className="appliedBookImg" alt="book image"></img>
                </div>
                <div className="col-6 appliedContentDiv">
                    <p><span className="appliedBookContent">Title&nbsp;:</span>{title}</p>
                    <p><span className="appliedBookContent">Author&nbsp;:</span>{author}</p>
                    <p><span className="appliedBookContent">Language&nbsp;:</span>{language}</p>
                    <p><span className="appliedBookContent">Status&nbsp;:</span>{status}</p>
                </div>
                <div className="appliedButtonDiv col-12 col-md-3 d-md-flex flex-row flex-md-column">
                    <button className="btn btn-success" onClick={approveBookFun}><b>Approve</b></button>
                    <button className="btn btn-danger" onClick={rejectBookFun}><b>Reject</b></button>
                </div>
            </div>
        </div>
    )
}
export default ApprovalComp;