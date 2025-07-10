import './index.css';
const serverURL = process.env.REACT_APP_SERVER_URL;
const ResultsNotFound=()=>{
    return(
        <div className="noResults">
            <img src={`${serverURL}/uploads/9170826.jpg`} alt="image not found"/>
        </div>
    )
}
export default ResultsNotFound;