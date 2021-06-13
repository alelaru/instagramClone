import useUser from "../hooks/use-user";


const Sidebar = () => {

    const {user}  = useUser();
    console.log("x", user);

    return ( 
    <p>I am the sidebar</p> 
    );
}
 
export default Sidebar;