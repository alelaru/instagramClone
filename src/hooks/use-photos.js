import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { getPhotos, getUserbyUserId } from "../services/firebase";


const usePhotos = () => {

    const [photos, setPhotos] = useState()

    const {
        user: {
            uid: userId = ""
        }

    } = useContext(UserContext)

    useEffect(() => {
        
        async function getTimeLinePhotos(){
            //Example: [2,1,5] <- 2 being raphael
            const [{ following }] = await getUserbyUserId(userId);
            let followedUserPhotos = [];

            //Does the person actually follows people
            if(following.length > 0){
                followedUserPhotos = await getPhotos(userId, following);
            }

            // Then youll get the new photos first
            followedUserPhotos.sort((a,b) => b.dataCreated - a.dataCreated);
            setPhotos(followedUserPhotos)
        }
        if(userId){
             getTimeLinePhotos();
        }
    
        return () => {
            
        }
    }, [userId]);

    return { photos };
}
 
export default usePhotos;