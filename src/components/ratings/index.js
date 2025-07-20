import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Preloader from "../loader";
import UserRatingComp from "./userRatingComp";
import './index.css';

const serverURL = process.env.REACT_APP_SERVER_URL;
const BookRating=()=>{
    const [ratingsList,setRatingsList]=useState({imageurl:'',
        ratings:[]
    });
    let ratingsComponent;
    const [loading,setLoading]=useState(false);
    const {bookid}=useParams();
    useEffect(
        ()=>{
            setLoading(true);
            const getDetails=async()=>{
                const response=await fetch(`${serverURL}/bookDetails/${bookid}`);
                const ratingsData=await response.json();
                setRatingsList(ratingsData);
            }
            getDetails();
            setLoading(false)
        },[]
    )
    const imageSource=(ratingsList.imageurl.includes('cloudinary'))?ratingsList.imageurl:`${serverURL}/uploads/books/${ratingsList.imageurl}`;
    if(!ratingsList.ratings[0]){
        ratingsComponent=<p>No ratings yet</p>
    }
    else{
        ratingsComponent=ratingsList.ratings.map((eachItem)=><UserRatingComp ratings={eachItem}/>)
    }
    return(
        loading?<Preloader/>:<div className="ratingSection mt-0 mt-md-4">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h3 className="ratingsHeading">Book ratings </h3>
                    </div>
                    <div className="col-12 col-sm-3 ratingImageDiv">
                        <img src={imageSource} alt='img not avilable' className="ratingSectionImage mb-2 mb-md-0"></img>
                    </div>
                    <div className="col-12 col-sm-9">
                        <div className="row">
                            <div className="col-3 col-md-2">
                                <p className="ratingSideHeading">Book Id :</p>
                            </div>
                            <div className="col-9 col-md-10">
                                <p>{ratingsList.bookid}</p>
                            </div>
                            <div className="col-3 col-md-2">
                                <p className="ratingSideHeading">Title :</p>
                            </div>
                            <div className="col-9 col-md-10">
                                <p>{ratingsList.title}</p>
                            </div>
                            <div className="col-3 col-md-2">
                                <p className="ratingSideHeading">Author :</p>
                            </div>
                            <div className="col-9 col-md-10">
                                <p>{ratingsList.author}</p>
                            </div>
                            <div className="col-3 col-md-2">
                                <p className="ratingSideHeading">Status :</p>
                            </div>
                            <div className="col-9 col-md-10">
                                <p>{ratingsList.status}</p>
                            </div>
                        </div>
                        <div className="row mt-4 displayRatings">
                                {ratingsComponent}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default BookRating;