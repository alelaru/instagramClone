import { useEffect } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar/sidebar";
import Timeline from "../components/timeline";
import useUser from "../hooks/use-user";
import PropTypes from "prop-types";
import LoggedInUserContext from "../context/logged-in-user";


const Dashboard = ({user : loggedInUser}) => {

    const {user} = useUser(loggedInUser.uid);

    useEffect(() => {
        return () => {
            document.title = "Instagram"
        }
    }, []);
    
    return ( 

        <LoggedInUserContext.Provider value={{ user }}>
            <div className="bg-gray-background">
                <Header/>
                <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                    <Timeline></Timeline>
                    <Sidebar></Sidebar>
                </div>
            </div>  
        </LoggedInUserContext.Provider>
    );
}
 
export default Dashboard;

// 1024
// 2/3 <-> 1/3
// 66% | 33% 

Dashboard.propTypes = {
    user: PropTypes.object.isRequired
}