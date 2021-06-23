import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import { getUserPhotosByUsername } from "../../services/firebase";
import Header from "./header"
import Photos from "./photos";

const UserProfile = ( {user} ) => {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0
    }   

    const [{profile, photosCollection, followerCount}, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        async function getProfileInfoAndPhotos(){
            // console.log("user to ask photos", user);
            const photos = await getUserPhotosByUsername(user.userId);
            // console.log("PHOTOS", photos);
            // console.log("USER", user);
            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
            // console.log("PROFILE", profile);
            // console.log("PHOTOS COUNT", photosCollection);
            // console.log("followerCount", followerCount);
        }
            getProfileInfoAndPhotos();
    }, [user.username]);

    return ( 
        <>
            <Header 
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            >
            </Header>
            <Photos photos={photosCollection}></Photos>
        </>
        );
}
 
export default UserProfile;

UserProfile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number,
        emailAddress: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array,
        fullName: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string
      })
    }