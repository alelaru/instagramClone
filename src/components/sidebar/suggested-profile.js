import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";


const SuggestedProfile = ({userDocId, username, profileId, userId}) => {
    const [followed, setFollowed] = useState(false)

    const handlefollowedUser = async () => {
        setFollowed(true);

        //firebase create two functions
        //update the following array of the following user
        //update the followers array of the person begin followed

    }

    return !followed 
    ? ( 
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img
                    className="rounded-full w-8 flex m-3"
                    src={`/images/avatars/${username}.jpg`}
                    alt=""
                ></img>
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
            <div className="">
                <button 
                    className="text-sm font-bold text-blue-medium"
                    type="button"
                    onClick={handlefollowedUser}
                >Follow</button>
            </div>
        </div>
    )
    : null
}
 
export default SuggestedProfile;

SuggestedProfile.propTypes = {
    userId : PropTypes.string.isRequired,
    userDocId: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}