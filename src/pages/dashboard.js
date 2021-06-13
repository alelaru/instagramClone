import { useEffect } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar/sidebar";
import Timeline from "../components/timeline";


const Dashboard = () => {

    useEffect(() => {
        return () => {
            
        }
    }, [ ]);
    
    return ( 
        <div className="bg-gray-background">
            <Header/>
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <Timeline></Timeline>
                <Sidebar></Sidebar>
            </div>
        </div>  
    );
}
 
export default Dashboard;

// 1024
// 2/3 <-> 1/3
// 66% | 33% 