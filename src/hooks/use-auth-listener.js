import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../context/firebase";

const useAuthListener = () => {
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));
    const { firebase } = useContext(FirebaseContext)
    
    useEffect(() => {

        firebase.auth().onAuthStateChanged((authUser) => {
            // If we have auth user we can store the user in localStorage
            if(authUser){
                localStorage.setItem("authUser", JSON.stringify(authUser));
                setUser(authUser)
            }
            // We don't have an auth user, we clear the LocalStorage
            else{
                localStorage.removeItem("authUser");
                setUser(null);
            }
        })
    
        // return () => listener;

    }, [firebase]);

    return { user };
}
 
export default useAuthListener;