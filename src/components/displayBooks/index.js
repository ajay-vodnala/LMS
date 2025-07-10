import './index.css';
import { Link } from 'react-router-dom';
const serverURL = process.env.REACT_APP_SERVER_URL;
const DisplayBooks=(props)=>{
    const {bookDetails}=props;
    const{bookId,imageUrl,title,author,department,yearOfPublish,language,location,status}=bookDetails;
    let statusColor=null;
    if(status==="available"){
        statusColor="greenText";
    }
    return(
        <tr className='dataRow'>
            <td className='imageDiv'><img src={`${serverURL}/uploads/books/${imageUrl}`} className='bookImg' alt='Book Image'></img></td>
            <td>{title}</td>
            <td>{author}</td>
            <td>{department}</td>
            <td>{yearOfPublish}</td>
            <td>{language}</td>
            <td>{location}</td>
            <td className={`statusText ${statusColor}`}>{status}</td>
            <td><Link className='bookLink' to={`/bookDetails/${bookId}`}><button>View</button></Link></td>         
        </tr>
       
    )
}
export default DisplayBooks;