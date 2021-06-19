import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUserByUserName } from "../services/firebase";
import * as ROUTES from "../constants/browse"
import Header from "../components/header"
import UserProfile from "../components/profile";

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
                setUser(user[0])
                setUserExist(true)
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
                <Header></Header>
                <div className="mx-auto max-w-screen-lg">
                    <UserProfile username={username} />
                </div>
            </div>
            : null
        );
}
 
export default Profile;