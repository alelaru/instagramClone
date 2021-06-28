import { useEffect } from "react";
import Header from "../components/header";

const NotFound = () => {

    useEffect(() => {
        document.title = "Not Found"
    }, [])

    return ( 
    <div className="bg-gray-background">
        <Header></Header>
        <div classname="mx-auto max-w-screen-lg">
            <p className="text-center text-2xl">Not Found</p>
        </div>
    </div>  
    );
}
 
export default NotFound;