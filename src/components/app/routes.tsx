import React from "react";

import { Redirect, RouteChildrenProps } from "react-router";

import { Login } from "../login";
import { Dashboard } from "../dashboard";
import { NotFound } from "../not-found";

export enum ROUTES_URLS {
  HOME = "/",
  LOGIN = "/signin",
  DASHBOARD = "/dashboard",
  OAUTH = "/oauth",
  NOT_FOUND = "/404"
}

export interface AppRoute {
  title?: string;
  path: ROUTES_URLS;
  exact?: boolean;
  isHidden?: boolean;
  isProtected?: boolean;
  render: (props: any) => any;
}

export const routes: Array<AppRoute> = [
  {
    title: "Login",
    path: ROUTES_URLS.LOGIN,
    exact: true,
    render: (props: any) => <Login {...props} />
  },
  {
    title: "Dashboard",
    path: ROUTES_URLS.DASHBOARD,
    isProtected: true,
    render: (props: RouteChildrenProps) => <Dashboard {...props} />
  },
  {
    path: ROUTES_URLS.HOME,
    exact: true,
    isHidden: true,
    render: () => <Redirect to={ROUTES_URLS.LOGIN} />
  },
  {
    path: ROUTES_URLS.NOT_FOUND,
    isHidden: true,
    render: (props: RouteChildrenProps) => <NotFound {...props} />
  }
];
