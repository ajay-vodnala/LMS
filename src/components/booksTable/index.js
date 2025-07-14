import './index.css';
import DisplayBooks from "../displayBooks";
const BooksTable=(props)=>{
    const {booksList}=props;
    return(
        <table>
            <thead>
                <tr className='tableHead'>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Department</th>
                    <th>Published</th>
                    <th>Language</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {booksList.map((eachItem)=><DisplayBooks bookDetails={eachItem} key={eachItem.bookid}/>)}
            </tbody>
        </table>
    )
}
export default BooksTable;