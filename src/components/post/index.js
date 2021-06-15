import PropTypes from "prop-types";
import Image from "./image";
import Header from "./header";
import Actions from "./actions";
import { useRef } from "react";


const Post = ({content}) => {
    console.log(content);

    const commentInput = useRef(null);

    const handleFocus = () => {
        commentInput.current.focus();
    }

    //components
    // header, image, actions (ability to click, like and comment), footer, commets
    return ( <div className="rounded col-span-4 border bg-white border-gray-primary mb-12"> 
                <Header username={content.username}></Header> 
                <Image caption={content.caption} src={content.imageSrc}></Image>
                <Actions 
                docId={content.docId} totalLikes={content.likes.length} 
                likedPhoto={content.userLikedPhoto} handleFocus={handleFocus}></Actions> 
            </div> );
}
 
export default Post;

Post.propTypes = {
    content: PropTypes.shape({
        username : PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired
    })
}