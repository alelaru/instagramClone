import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUserByUserName } from "../services/firebase";
import * as ROUTES from "../constants/browse"

const Profile = () => {
    const {username} = useParams();
    const [userExist, setUserExist] = useState(false)
    const [user, setUser] = useState(null)
    const history = useHistory();
    // console.log("Username", username);

    useEffect(() => {
        
        async function checkUserExist(){
            const user = await getUserByUserName(username)
            if(user.length > 0){
                setUserExist(true)
                setUser(user[0])
                console.log("Data of the user", user);
            }
            else{
                history.push(ROUTES.NOT_FOUND)
            }
        }
        checkUserExist();
    }, [username, history ]);

    return ( 
            userExist 
            ? <div className="bg-gray-background">
                <div className="mx-auto max-w-screen-lg">
                    {user.emailAddress}
                </div>
            </div>
            : null
        );
}
 
export default Profile;