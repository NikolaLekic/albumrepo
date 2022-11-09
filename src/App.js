import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
// PAGES
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Info from "./pages/Info";
import AlbumsInfo from "./pages/Albums";
// COMPONENTS
import { Navbar, RedirectRoute, ProtectedRoute } from "./components/Molecules";
// STORE ACTIONS
import { onSetUser, onGetImages } from "./store/actions";

import "./App.scss";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userName = sessionStorage.getItem("userName");
    dispatch(onSetUser(userName));
    if (userName) {
      dispatch(onGetImages());
    }
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <ProtectedRoute exact path={"/dashboard"} component={Dashboard} />
          <ProtectedRoute exact path={"/dashboard/:id"} component={Info} />
          <ProtectedRoute exact path={"/albums/:id"} component={AlbumsInfo} />
          <Route exact path={"/login"} component={Login} />
          <RedirectRoute />
        </Switch>
      </Router>
    </>
  );
};
export default App;
