import React, { FC } from "react";

import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router";

import { ROUTES_URLS } from "../app/routes";

interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  render,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(routeCompProps: RouteComponentProps) =>
        isAuthenticated ? (
          render!(routeCompProps)
        ) : (
          <Redirect
            to={{
              pathname: ROUTES_URLS.LOGIN,
              state: { from: routeCompProps.location }
            }}
          />
        )
      }
    />
  );
};
