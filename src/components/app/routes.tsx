import React from "react";

import { Redirect, RouteChildrenProps } from "react-router";

import { Login } from "../login";
import { Dashboard } from "../dashboard";
import { NotFound } from "../not-found";

export interface AppRoute {
  title?: string;
  path: string;
  exact?: boolean;
  isHidden?: boolean;
  render: (props: any) => any;
}

export const routes: Array<AppRoute> = [
  {
    title: "Login",
    path: "/login",
    exact: true,
    render: (props: any) => <Login {...props} />
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    render: (props: RouteChildrenProps) => <Dashboard {...props} />
  },
  {
    path: "/",
    exact: true,
    isHidden: true,
    render: () => <Redirect to="/login" />
  },
  {
    path: "/404",
    isHidden: true,
    render: (props: RouteChildrenProps) => <NotFound {...props} />
  }
];
