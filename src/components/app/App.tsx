import React from "react";
import { setToLocalStorage } from "../utils";

import {
  Route,
  Link,
  Switch,
  Redirect,
  RouteChildrenProps
} from "react-router-dom";

import { routes, AppRoute } from "./routes";
import { OAuth } from "../oauth";

const TOKEN_STORAGES_KEY = "TOKEN";

interface Boards {
  id: string;
  name: string;
  pinned: boolean;
  desc?: string;
}

interface LoginState {
  token: string;
  boards: Array<string>;
}

export class App extends React.Component<any, LoginState> {
  public state = {
    token: "",
    boards: []
  };

  private setToken = (token: string) => {
    this.setState({ token });
  };

  private isLoggedIn() {
    return !!this.state.token;
  }

  private renderHeader() {
    return (
      <header>
        {routes.map((route: AppRoute, i: number) =>
          route.isHidden ? null : (
            <Link key={i} to={route.path}>
              {route.title}
            </Link>
          )
        )}
      </header>
    );
  }

  private renderContent() {
    return (
      <main>
        <Switch>
          {routes.map((route: any, i: number) => (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={props => route.render({ ...props })}
            />
          ))}
          <Route
            path="/oauth"
            render={(props: RouteChildrenProps) => (
              <OAuth {...props} onSetToken={this.setToken} />
            )}
          />
          <Redirect to="/404" />
        </Switch>
      </main>
    );
  }

  public render() {
    return (
      <>
        {this.renderHeader()}
        {this.renderContent()}
      </>
    );
  }
}
