import { Link } from "react-router-dom";
import PropTypes from "prop-types";


const HeaderPost = ( {username}) => {
    return ( 
        <div className="flex border-b border-gray-primary h-4 p-4 py-8">
            <div className="flex items-center">
                <Link to={`/p/${username}`} className="flex items-center">
                    <img className="rounded-full h-8 mr-3"
                    src={`images/avatars/${username}.jpg`}
                    alt={`${username} profile`}
                    ></img>
                </Link>
                <p className=" font-bold">{username}</p>
            </div>
        </div>
     );
}
 
export default HeaderPost;

HeaderPost.propTypes = {
    username : PropTypes.string.isRequired,
}