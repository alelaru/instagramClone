import { lazy, Suspense } from "react";
import { Route, Router, Switch } from "react-router";

const Login = lazy(() => import ("./pages/login"));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading ...</p>}>
        <Switch>
          <Route path="/login" component={Login}>
          </Route> 
        </Switch> 
      </Suspense>
    </Router>
  );
}

export default App;
