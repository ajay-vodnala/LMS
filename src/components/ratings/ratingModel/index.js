import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Preloader from '../../loader';
import { useNavigate } from 'react-router-dom';
const serverURL = process.env.REACT_APP_SERVER_URL;
const jwtToken=Cookies.get('jwtToken');
const RatingModel=(props)=> {
    const navigate=useNavigate();
    const {bookid}=props;
    const [rating,setRating]=useState(0);
    const [loading,setLoading]=useState(false);
    const [feedback,setFeedback]=useState("");
    const handleRate=async()=>{
        setLoading(true);
            const options={
                method:"PUT",
                headers:{
                    "content-Type":"application/json",
                    Accept:"application/json",
                    authentication:`Bearer ${jwtToken}`
                },
                body:JSON.stringify({
                    rating:rating,
                    feedback:feedback
                })
            }
            const response=await fetch(`${serverURL}/updateRating/${bookid}`,options);
            const responseData=await response.json();
            if(response.ok){
                Swal.fire({
                            title: 'Success!',
                            text: 'Thankyou for your FeedBack!',
                            icon: 'success',
                            })
                            navigate(`/bookDetails/${bookid}`);
                        }
                else{
                    Swal.fire({
                            title: 'error!',
                            text: responseData.text,
                            icon: 'error',
                            confirmButtonText: 'OK'
                            }) 
                }  
                setLoading(false);
            }
    let ratingStarsArray=[];
    for(let i=0;i<rating;i++){
        ratingStarsArray.push(<i  className="fa-solid fa-star me-1" key={i}></i>);
    }
    for(let i=0;i<5-rating;i++){
        ratingStarsArray.push(<i onClick={(e) => setRating(e.target.dataset.value)} data-value={i+1} key={5-i} className="fa-regular me-1 fa-star"></i>);
    }
    const displayContent=loading?<Preloader/>:<Modal.Body>
        <form className='d-flex flex-column'>
            <label>Rating :&nbsp;</label>
            <div className='mb-3'>{ratingStarsArray}</div>
            <label>Feedback :&nbsp;</label>
            <textarea
                value={feedback}
                name="feedback"
                placeholder="Enter book feedback"
                rows="3"
                onChange={(e)=> { setFeedback(e.target.value)}}
                className='input-field mb-2'
            />
        </form>
      </Modal.Body>;
  return(
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            <div className='headingBar'>
                <h4>Rate Book</h4>
            </div>
        </Modal.Title>
      </Modal.Header>
      <div className='contentDisplay'>
          {displayContent}
      </div>
      <Modal.Footer>
        <Button variant='primary' onClick={handleRate}>Submit</Button>
        <Button variant='danger' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default RatingModel;