import PropTypes from "prop-types";
import HeaderPost from "./header";


const Post = ({content}) => {
    console.log(content);

    //components
    // header, image, actions (ability to click, like and comment), footer, commets
    return ( <HeaderPost username={content.username}></HeaderPost> );
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