import { formatDistance } from "date-fns";
import PropTypes from "prop-types";
import { useState } from "react";
import {Link} from "react-router-dom"
import AddComment from "./add-coment";



const Comments = ({docId, comments: allComments, posted, commenInput}) => {
    const [comments ,setComments] = useState(allComments);

    return ( 
            <>
                <div className="p-4 pt-1 pb-4">
                    {comments.length >= 4 && (
                        <p className="text-small text-gray-base mb-1 cursor-pointer">
                            View all comments
                        </p>
                    )}
                    {comments.slice(0,3).map((item) => (
                        <p key={`${item.comment}-${item.displayName}`} className="mb-1">
                            <Link to={`/p/${item.displayName}`}>
                                <span className="mr-1 font-bold">{item.displayName}</span>
                            </Link>
                            <span>{item.comment}</span>
                        </p>
                    ))}
                    <p className="text-gray-base uppercase text-xs mt-2">{formatDistance(posted, new Date())} ago</p>
                    <AddComment docId={docId} comments={comments} setComments={setComments} commentInput={commenInput}></AddComment>
                </div>
            </>
        );
}
 
export default Comments;

Comments.propTypes = {
        docId: PropTypes.string.isRequired,
        comments: PropTypes.array.isRequired,
        posted: PropTypes.number.isRequired,
        commenInput: PropTypes.object.isRequired
}