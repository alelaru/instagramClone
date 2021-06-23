import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUserByUserName } from "../services/firebase";
import * as ROUTES from "../constants/browse"
import Header from "../components/header"
import UserProfile from "../components/profile";

const Profile = () => {
    const {username} = useParams();
    const [user, setUser] = useState(null)
    const history = useHistory();
    // console.log("Username", username);

    useEffect(() => {
        
        async function checkUserExist(){
            const [user] = await getUserByUserName(username)
            if(user?.userId){
                setUser(user)
            }
            else{
                history.push(ROUTES.NOT_FOUND)
            }
        }
        checkUserExist();
    }, [username, history ]);

    return ( 
            user?.username 
            ? <div className="bg-gray-background">
                <Header></Header>
                <div className="mx-auto max-w-screen-lg">
                    <UserProfile user={user} />
                </div>
            </div>
            : null
        );
}
 
export default Profile;