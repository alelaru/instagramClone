import { useEffect, useState } from 'react';
import { getUserbyUserId } from "../services/firebase"

// We need to call firabase to get the 

export default function useUser(userId){
    const [activeUser, setActiveUser] = useState({});

    useEffect(() => {
        async function getUserObjByUserId(userId){
            //We need a function that we can call so firebase service gets the user data based on the Id
            //If we have that we can set activeuser 
            const [user] = await getUserbyUserId(userId);
            setActiveUser(user || {});
        }
        //Issue if the component does render and there is no id

        if(userId){
            getUserObjByUserId(userId);
        }
    }, [userId]);

    return { user: activeUser } ;
}
