import useUser from "../../hooks/use-user";
import Suggestions from "./suggestions";
import User from "./user";


const Sidebar = () => {

    const {user: {username, fullName, userId, following}}  = useUser();

    return ( 
    <div className="p-4">
        <User username={username} fullName={fullName}></User>
        <Suggestions userId={userId} following={following}></Suggestions>
    </div> 
    );
}
 
export default Sidebar;