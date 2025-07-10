import { Link } from "react-router-dom";
const AppliedBookComp=(props)=>{
    const {bookDetails,removeBook}=props;
    const{bookId,imageUrl,title,author,status,language,appliedBy}=bookDetails;
    const removeBookFun=()=>{
        removeBook(bookId,statusValue,appliedByValue,alertText);
    }
    const buttonText=(status==="applied")?"Return":"Remove";
    const statusValue=(status==="applied")?"return-pending":"available";
    const statusStyle=(status==="applied")?"statusColorGreen":"statusColorRed";
    const appliedByValue=(status==="applied")?appliedBy:" ";
    const alertText=(status==="applied")?"Book Return Successful wait for approval":"Book removed Successfully";
    return(
        <div className="singleBookDiv container">
            <div className="row">
                <div className="col-3 appliedImageDiv">
                    <img src={imageUrl} className="appliedBookImg" alt="book image"></img>
                </div>
                <div className="col-6 appliedContentDiv">
                    <p><span className="appliedBookContent">Title&nbsp;:&nbsp;</span><b>{title}</b></p>
                    <p><span className="appliedBookContent">Author&nbsp;:&nbsp;</span>{author}</p>
                    <p><span className="appliedBookContent">Language&nbsp;:&nbsp;</span>{language}</p>
                    <p><span className="appliedBookContent">Status&nbsp;:&nbsp;</span><span className={statusStyle}><b>{status}</b></span></p>
                </div>
                <div className="appliedButtonDiv col-12 col-md-3 d-md-flex flex-row flex-md-column">
                    <button className="btn btn-danger" onClick={removeBookFun}><b>{buttonText}</b></button>
                    <Link to={`/bookDetails/${bookId}`}> <button className="btn btn-primary"><b>View</b></button></Link>
                </div>
            </div>
        </div>
    )
}
export default AppliedBookComp;