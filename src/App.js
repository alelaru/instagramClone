import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Login from "./pages/login";
import * as ROUTES from "./constants/browse"

const Login = lazy(() => import ("./pages/login.js"));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading ...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login}/>
        </Switch> 
      </Suspense>
    </Router>
  );
}

export default App;
