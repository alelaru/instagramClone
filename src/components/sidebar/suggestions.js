import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getSuggestedProfiles } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./suggested-profile";


const Suggestions = ({userId, following, loggedInUserDocId}) => {
    // The profiles to be suggested to the usetr
    const [profiles, setProfiles] = useState(null);
    
    
  // hint: use the firebase service (call using userId)
  // getSuggestedProfiles
  // call the async function ^^^^ within useEffect
  // store it in state
  // go ahead and render (wait on the profiles as in 'skeleton')

    useEffect(() => {

        const suggestedProfiles = async () => {
            const response = await getSuggestedProfiles(userId, following);
            // console.log(response);
            setProfiles(response);
        }

        if(userId){
            suggestedProfiles();
            // console.log("Now there is a userId and i'll call the suggestedProfiles to firebase getSugg ");
        }

    }, [userId, following]);

    return !profiles 
    ? ( 
        <Skeleton count={1} height={150}></Skeleton>
     )
    : profiles.length > 0 ? 
        ( 
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items justify-between mb-2">
                <p className="font-bold text-gray-base">Suggestions for you</p>
            </div>
            <div className="grid mt-4 gap-5">
                {profiles.map(profile => 
                    (
                        <SuggestedProfile
                            key={profile.docId}
                            sgProfileId={profile.docId}
                            username={profile.username}
                            profileId={profile.userId}
                            userId={userId}
                            loggedInUserDocId={loggedInUserDocId}
                        />
                    )
                )}
            </div>
        </div>
        )
        : null
}
 
export default Suggestions;

Suggestions.propTypes = {
    userId : PropTypes.string
}