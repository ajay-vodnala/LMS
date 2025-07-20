import './index.css';
import { Link } from 'react-router-dom';
const serverURL = process.env.REACT_APP_SERVER_URL;
const DisplayBooks=(props)=>{
    const {bookDetails}=props;
    let rating=0;
    const{bookid,imageurl,title,author,department,ratings,language,location,status}=bookDetails;
    const imageSource=(imageurl.includes('cloudinary'))?imageurl:`${serverURL}/uploads/books/${imageurl}`;
    let statusColor=null;
    if(status==="available"){
        statusColor="greenText";
    }
    if(ratings[0]){
         ratings.map((eachitem)=>rating=rating+parseInt(eachitem.rating));
         rating=parseInt(rating/bookDetails.ratings.length);
    }else{
        rating=0;
    }
   
    return(
        <tr className='dataRow'>
            <td className='imageDiv'><img src={imageSource} className='bookImg' alt='Book Image'></img></td>
            <td>{title}</td>
            <td>{author}</td>
            <td>{department}</td>
            <td>{rating}/5</td>
            <td>{language}</td>
            <td>{location}</td>
            <td className={`statusText ${statusColor}`}>{status}</td>
            <td><Link className='bookLink' to={`/bookDetails/${bookid}`}><button>View</button></Link></td>         
        </tr>
       
    )
}
export default DisplayBooks;
