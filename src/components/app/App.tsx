import React from "react";

import {
  Route,
  Link,
  Switch,
  Redirect,
  RouteChildrenProps,
  withRouter,
  RouteComponentProps
} from "react-router-dom";

import { setToLocalStorage, getFromLocalStorage } from "../../utils";
import { routes, AppRoute, ROUTES_URLS } from "./routes";
import { OAuth } from "../oauth";
import { ProtectedRoute } from "../protected-route";

const { REACT_APP_API_KEY } = process.env;

const TOKEN_STORAGE_KEY = "TOKEN";

const INITIAL_STATE = {
  token: "",
  userProfile: undefined,
  boards: []
};
interface Board {
  id: string;
  name: string;
  pinned: boolean;
  desc?: string;
}

interface AppState {
  token: string;
  boards: Array<Board>;
  userProfile: any;
}

interface CustomToken {
  token: string;
  expireIn: number;
}

interface AppProps extends RouteComponentProps {}

class App extends React.Component<AppProps, AppState> {
  public state = INITIAL_STATE;

  componentDidMount() {
    this.getToken();
  }

  private async getToken() {
    if (this.state.token) {
      return;
    }

    const { token } = getFromLocalStorage<CustomToken>(TOKEN_STORAGE_KEY);
    if (!token) {
      return this.navigateToLogin();
    }

    const url = `https://api.trello.com/1/members/me?key=${REACT_APP_API_KEY}&token=${token}`;
    const response = await fetch(url);

    if (response.ok === true && response.status === 200) {
      const userProfile = await response.json();
      this.setProfile(userProfile);
      this.setToken(token);
      return this.navigateToDashboard();
    }
    return this.navigateToLogin();
  }

  private navigateToLogin() {
    this.props.history.push(ROUTES_URLS.LOGIN);
  }

  private navigateToDashboard() {
    this.props.history.push(ROUTES_URLS.DASHBOARD);
  }

  private setProfile(userProfile: any) {
    this.setState({ userProfile });
  }

  private setToken = (token: string) => {
    this.setState({ token });
    setToLocalStorage<CustomToken>(TOKEN_STORAGE_KEY, {
      token,
      expireIn: Date.now()
    });
  };

  private get isLoggedIn() {
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
        <button onClick={this.logOut}>Log out</button>
      </header>
    );
  }

  private logOut = () => {
    this.setState(INITIAL_STATE);
    this.navigateToLogin();
  };

  private renderContent() {
    return (
      <main>
        <Switch>
          {routes.map(this.renderRoute)}
          <Route
            path={ROUTES_URLS.OAUTH}
            render={(props: RouteChildrenProps) => (
              <OAuth {...props} onSetToken={this.setToken} />
            )}
          />
          <Redirect to={ROUTES_URLS.NOT_FOUND} />
        </Switch>
      </main>
    );
  }

  public renderRoute = (route: AppRoute, i: number) => {
    if (route.isProtected) {
      return (
        <ProtectedRoute key={i} {...route} isAuthenticated={this.isLoggedIn} />
      );
    } else {
      return (
        <Route
          key={i}
          {...route}
          render={props => route.render({ ...props })}
        />
      );
    }
  };

  public render() {
    return (
      <>
        {this.renderHeader()}
        {this.renderContent()}
      </>
    );
  }
}

const AppWithRoute = withRouter(App);

export { AppWithRoute as App };
