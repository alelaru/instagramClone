import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile } from "../../services/firebase";



const Header = ({
    
    photosCount, 
    followerCount, 
    setFollowerCount,
    loggedInUsername,
    profile: {
        docId: profileDocId,
        userId: profileUserId,
        fullName,
        followers,
        following,
        username: profileUsername
      }
    }) => {
    const {user} = useUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== profileUsername
    //console.log(activeBtnFollow);
    // console.log(photosCount);

    useEffect(() => {
        console.log("photosCount", photosCount);
        const isLoggedInUserFollowingProfile = async () =>{
            const isFollowing = isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(isFollowing)
        }
    
        if(user.username && profileUserId){
            isLoggedInUserFollowingProfile();
        }
    }, [ user?.username, profileUserId ]);

    const handleToggleFollow = (e) => {
        e.preventDefault();
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile ? followers.length - 1 : followers.length + 1
        })
        
    }
    
    return ( 
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center items-center">
                {profileUsername && (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                    className="rounded-full h-40 w-40 flex"
                    alt={`${profileUsername} profile picture`}
                    src={`/images/avatars/${profileUsername}.jpg`}
                    ></img>
                )}
            </div> 
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profileUsername}</p>
                    {activeBtnFollow && (
                        <button
                            className="bg-blue-medium font-bold rounded text-white text-sm w-20 h-8"
                            type="button"
                            onClick={handleToggleFollow}
                            onKeyDown={(event) => {
                                if(event.key === "Enter"){
                                    handleToggleFollow()
                                }
                            }}
                        >
                            {isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>
                <div className="container flex mt-4">
                    {followers === undefined || following === undefined 
                    ? (
                        <Skeleton count={1} width={677} height={24}></Skeleton>
                    )
                    : (
                        <>
                            <p className="mr-10">
                                <span className="font-bold">{photosCount}</span> photos
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">{followers.length}</span> 
                                {` `}
                                {followers.length === 1 ? "follower" : "followers"}
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">{following.length}</span>
                                 following
                            </p>
                        </>
                    )
                    }
                </div>
            </div>
        </div>

    );
}
 
export default Header;

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        username: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array
      }).isRequired
}