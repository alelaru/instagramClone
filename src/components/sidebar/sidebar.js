import useUser from "../../hooks/use-user";
import Suggestions from "../suggestions";
import User from "./user";


const Sidebar = () => {

    const {user: {username, fullName, userId}}  = useUser();

    return ( 
    <div className="p-4">
        <User username={username} fullName={fullName}></User>
        <Suggestions userId={userId}></Suggestions>
    </div> 
    );
}
 
export default Sidebar;