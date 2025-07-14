import './index.css';
import { Link } from 'react-router-dom';
const serverURL = process.env.REACT_APP_SERVER_URL;
const DisplayBooks=(props)=>{
    const {bookDetails}=props;
    const{bookid,imageurl,title,author,department,yearofpublish,language,location,status}=bookDetails;
    const imageSource=(imageurl.includes('cloudinary'))?imageurl:`${serverURL}/uploads/books/${imageurl}`;
    let statusColor=null;
    if(status==="available"){
        statusColor="greenText";
    }
    return(
        <tr className='dataRow'>
            <td className='imageDiv'><img src={imageSource} className='bookImg' alt='Book Image'></img></td>
            <td>{title}</td>
            <td>{author}</td>
            <td>{department}</td>
            <td>{yearofpublish}</td>
            <td>{language}</td>
            <td>{location}</td>
            <td className={`statusText ${statusColor}`}>{status}</td>
            <td><Link className='bookLink' to={`/bookDetails/${bookid}`}><button>View</button></Link></td>         
        </tr>
       
    )
}
export default DisplayBooks;
