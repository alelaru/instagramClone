import { useEffect, useState } from "react";
import { getPhotos } from "../services/firebase";


const usePhotos = (user) => {

    const [photos, setPhotos] = useState(null)

    useEffect(() => {
        
        async function getTimeLinePhotos(){

            //Does the person actually follows people
            if(user?.following?.length > 0){
                const followedUserPhotos = await getPhotos(user.userId, user.following);
                // Then youll get the new photos first, rearranged
                followedUserPhotos.sort((a,b) => b.dataCreated - a.dataCreated);
                setPhotos(followedUserPhotos)
            }
        }
             getTimeLinePhotos();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.userId]);

    return { photos };
}
 
export default usePhotos;