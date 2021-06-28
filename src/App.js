import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Login from "./pages/login";
import * as ROUTES from "./constants/browse"
import UserContext from "./context/user";
import ProtectedRoute from "./helpers/protected-route";
import useAuthListener from "./hooks/use-auth-listener";

const Login = lazy(() => import ("./pages/login.js"));
const SignUp = lazy(() => import ("./pages/signup.js"));
const NotFound = lazy(() => import ("./pages/notfound.js"));
const Dashboard = lazy(() => import ("./pages/dashboard.js"));
const Profile = lazy(() => import ("./pages/profile.js"));


function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{user}}>
    <Router>
      <Suspense fallback={<p>Loading ...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login}/>
          <Route path={ROUTES.SIGN_UP} component={SignUp}/>
          <Route path={ROUTES.PROFILE} component={Profile}/>
          {/* <Route path={ROUTES.SIGN_UP} component={SignUp}></Route> */}
          {/* The protected works to not let the users enter into the page without a login/signup */}
          <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
            <Dashboard/>
          </ProtectedRoute>
          <Route component={NotFound}></Route>
        </Switch>  
      </Suspense>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
