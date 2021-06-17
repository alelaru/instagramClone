import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom";

import * as ROUTES from "../constants/browse"

const ProtectedRoute = ( {user, children, ...rest} ) => {
    return ( 
        <Route
            {...rest}
            render={({location}) => {
                if(user){
                    return children;
                }
                if(!user){
                  return  <Redirect
                        to={{
                            pathname: ROUTES.LOGIN,
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
 
export default ProtectedRoute;  


ProtectedRoute.propTypes = {
    userId : PropTypes,
    children: PropTypes.object.isRequired,
}