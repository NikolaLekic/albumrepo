import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userName = sessionStorage.getItem("userName");
  return (
    <Route
      {...rest}
      render={(props) =>
        userName ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
