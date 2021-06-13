import useUser from "../../hooks/use-user";
import Suggestions from "../suggestions";
import User from "./user";


const Sidebar = () => {

    const {user}  = useUser();
    console.log("x", user);

    return ( 
    <div className="p-4">
        <User></User>
        <Suggestions></Suggestions>
    </div> 
    );
}
 
export default Sidebar;