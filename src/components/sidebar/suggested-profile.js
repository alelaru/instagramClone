import PropTypes from "prop-types";
import { useState } from "react";


const SuggestedProfile = ({userDocId, username, profileId, userId}) => {
    const [followed, setFollowed] = useState(false)

    return !followed 
    ? ( 
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img
                    className="rounded-full w-8 flex m-3"
                    src={`/images/avatars/${username}.jpg`}
                    alt=""
                ></img>
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