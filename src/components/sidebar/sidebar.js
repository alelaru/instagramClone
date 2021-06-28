import { useContext } from "react";
import LoggedInUserContext from "../../context/logged-in-user";
import Suggestions from "./suggestions";
import User from "./user";


const Sidebar = () => {
    const {user: { docId = "", username, fullName, userId, following } = {} } = useContext(LoggedInUserContext);

    return ( 
    <div className="p-4">
        <User username={username} fullName={fullName}></User>
        <Suggestions userId={userId} following={following} loggedInUserDocId={docId} ></Suggestions>
    </div> 
    );
}
 
export default Sidebar;