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
        async function getProfileInfoAndPhotos(){
            const [ user ] = await getUserByUserName(username);
            console.log("USERNAME", user);
            const photos = getUserPhotosByUsername(user.userId);
            // dispatch({profile: user, photosCollection:photos, followerCount:user.followers.length})

        }
        if(username){
            getProfileInfoAndPhotos();
        }
    }, [ ]);

    return ( <Header></Header> );
}
 
export default UserProfile;

UserProfile.propTypes = {
    username: PropTypes.string.isRequired,
}