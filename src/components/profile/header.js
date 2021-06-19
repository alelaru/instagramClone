import PropTypes from "prop-types";
import { useState } from "react";



const Header = () => {
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    


    return ( <p>Im a Header</p> );
}
 
export default Header;

Header.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
}