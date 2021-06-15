import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { getUserbyUserId } from "../services/firebase"

// We need to call firabase to get the 

export default function useUser(){

    const [activeUser, setActiveUser] = useState({});
    const {user} = useContext(UserContext);

    useEffect(() => {
        
        async function getUserObjByUserId(){
            //We need a function that we can call so firebase service gets the user data based on the Id
            //If we have that we can set activeuser 
            const [response] = await getUserbyUserId(user.uid);
            setActiveUser(response);
        }
        //Issue if the component does render and there is no id

        if(user?.uid){
            getUserObjByUserId();
        }
    }, [user]);

    return { user: activeUser } ;
}
