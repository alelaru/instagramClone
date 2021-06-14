import useUser from "../../hooks/use-user";
import Suggestions from "./suggestions";
import User from "./user";


const Sidebar = () => {
    const {user: { docId, username, fullName, userId, following }
    }  = useUser();

    console.log(docId);

    return ( 
    <div className="p-4">
        <User username={username} fullName={fullName}></User>
        <Suggestions userId={userId} following={following} loggedInUserDocId={docId} ></Suggestions>
    </div> 
    );
}
 
export default Sidebar;