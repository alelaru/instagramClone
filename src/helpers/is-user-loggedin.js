import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom";

import * as ROUTES from "../constants/browse"

const IsUserLoggedIn = ( {user, children, loggedInPath, ...rest} ) => {

    console.log("user ....", user);
    console.log(" HAY O NO HAY?",!user ? "false" : "true");


    return ( 
        <Route
            {...rest}
            render={({location}) => {
                if(!user){
                    return children;
                }
                if(user){
                  return  <Redirect
                        to={{
                            pathname: loggedInPath,
                            state: { from: location}
                        }}
                    ></Redirect>
                }
                return null;
            }}
        >
        </Route>
     );
}
 
export default IsUserLoggedIn;  


IsUserLoggedIn.propTypes = {
    userId : PropTypes.string,
    loggedInPath: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
}