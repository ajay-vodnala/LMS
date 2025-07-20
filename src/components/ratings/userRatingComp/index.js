const UserRatingComp=(props)=>{
    const {ratings}=props;
    const {rating,feedback,ratedby}=ratings;
    let ratingStarsArray=[];
    for(let i=0;i<rating;i++){
        ratingStarsArray.push(<i className="fa-solid fa-star"></i>);
    }
    for(let i=0;i<5-rating;i++){
        ratingStarsArray.push(<i className="fa-regular fa-star"></i>);
    }
    return(
        <>
                <div className="col-2 col-md-2 col-lg-1 mt-4">
                    <p className="ratedProfile">{ratedby[0].toUpperCase()}</p>
                </div>
                <div className="col-10 col-md-10 col-lg-11 mt-4">
                    <p>{ratedby}</p>
                </div>
                <div className="col-2 col-md-2 col-lg-1">
                    <p>Rating:</p>
                </div>
                <div className="col-10 col-md-10 col-lg-11">
                    <p>{ratingStarsArray}</p>
                </div>
                <div className="col-3 col-sm-2 col-lg-1">
                    <p>Feedback:</p>
                </div>
                <div className="col-9 col-sm-10 col-lg-11">
                    <p>{feedback}</p>
                </div>
          </>
    )

}
export default UserRatingComp;