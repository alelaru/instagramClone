
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import UserContext from "../../context/user";
import { addCommentToDatabase } from "../../services/firebase";




const AddComment = ({docId, comments, setComments, commentInput}) => {
    const [comment, setComment] = useState("");

    const { user: {displayName} } = useContext(UserContext);
    // const { user } = useContext(UserContext);

    // console.log("userid",userId + " Username: " + username);
    // console.log(userId);
    // console.log("user", displayName);

    const handleSubmitComment = (e) => {
        e.preventDefault();
        console.log(docId);

        //giv me a new array
        //add the new comment
        // put the rest of the comments
        setComments([{ displayName, comment}, ...comments]);

        
        addCommentToDatabase({comment, displayName }, docId)
        setComment("");

        return null;
    }

    return ( 
        <div className="border-t border-gray-primary">
            <form className="flex justify-between pr-0 pl-5" method="POST" 
                onSubmit={
                    (event) => comment.length >= 0 
                    ? handleSubmitComment 
                    : event.preventDefault()}>
                <input 
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                    aria-label="Add a comment" 
                    placeholder="Add a comment"
                    type="text"
                    name="add comment"
                    value={comment} 
                    onChange={(event) => setComment(event.target.value)}
                    ref={commentInput}
                >
                </input> 
                <button 
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`} 
                    type="submit"
                    disable={comment.length < 1}
                    onClick={handleSubmitComment}
                >Post</button>
            </form>
        </div>

        );
}
 
export default AddComment;

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired, 
    setComments: PropTypes.func.isRequired, 
    commentInput: PropTypes.object.isRequired
}