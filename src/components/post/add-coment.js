
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { addCommentToDatabase } from "../../services/firebase";




const AddComment = ({docId}) => {
    const [comment, setComment] = useState("");

    const { user: { uid: userId = ""} } = useContext(UserContext);
    // const { user } = useContext(UserContext);

    // console.log("userid",userId + " Username: " + username);
    // console.log(userId);
    // console.log("docId", docId);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(docId);
    //  const comments = {comment, displayName: "Karl"};
    // console.log({comments: {comment, displayName: "Karl"}});
    addCommentToDatabase(comment , docId)


    }

    return ( 
        <form onSubmit={handleSubmit}>
            <div>
            <input onChange={(event) => setComment(event.target.value)}></input> 
            <button type="submit">Post</button>
            </div>
        </form>
        );
}
 
export default AddComment;

AddComment.propTypes = {
    docId: PropTypes.string.isRequired
}