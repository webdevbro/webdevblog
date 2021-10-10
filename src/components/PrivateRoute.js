import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  const { user } = useContext(ThemeContext);
  return (
    <Route
      render={(props) => {
        return user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
