import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const User = ({username, fullName}) => {
   return !username || !fullName  
    ? (
        <Skeleton count={1} height={61}></Skeleton>
        )
    : ( 
        <Link to={`/p/${username}`} className="grid">
            <p>{username}</p>
        </Link>
    )
}   

export default User;

User.propTypes = {
    username: PropTypes.string,
    fullName: PropTypes.string

}
