import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import { getUserByUserName, getUserPhotosByUsername } from "../../services/firebase";
import Header from "./header"

const UserProfile = ({username}) => {
    const reducer = (state, newState) => ({ ...state, ...newState});
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0
    }   

    const [{profile, photosCollection, followerCount}, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        async function getProfileInfoAndPhotos(username){
            const [{ user }] = await getUserByUserName(username);
            // const photos = getUserPhotosByUsername(username);
            // dispatch({profile: user, photosCollection:photos, followerCount:user.followers.length})
        }
    
        getProfileInfoAndPhotos(username);
    }, [ ]);

    return ( <Header></Header> );
}
 
export default UserProfile;

UserProfile.propTypes = {
    username: PropTypes.string.isRequired,
}