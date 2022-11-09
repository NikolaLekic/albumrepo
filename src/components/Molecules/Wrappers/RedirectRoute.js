import React from "react";
import { Route, Redirect } from "react-router-dom";

export const RedirectRoute = ({ ...rest }) => {
  const userName = sessionStorage.getItem("userName");
  return (
    <Route
      {...rest}
      render={() => {
        return userName ? (
          <Redirect to="/dashboard" />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};
