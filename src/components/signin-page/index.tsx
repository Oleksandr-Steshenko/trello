import React from "react";
import { setToLocalStorage, getFromLocalStorage } from "../utils";
import Dashboard from "../dashboard";
import Login from "../login";

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

export default class HomePage extends React.Component<HomePage> {
  public state = {
    token: "",
    boards: []
  };

  private async setToken(token: string) {
    this.setState({ token });
    await setToLocalStorage(TOKEN_STORAGES_KEY, token);
  }

  private async getToken() {
    const token = await getFromLocalStorage(TOKEN_STORAGES_KEY);
    return token;
  }

  private getTokenFromUrl() {
    return window.location.hash.split("=")[1];
  }

  private isLoggedIn() {
    return !!this.state.token;
  }

  private renderLoginHeader() {
    return (
      <header>{this.isLoggedIn() ? "Hello User!" : "Not logged in"}</header>
    );
  }

  private renderLoginMain() {
    return <main>{this.isLoggedIn() ? <Dashboard /> : <Login />}</main>;
  }

  public async componentDidMount() {
    // const savedToken = await this.getToken();
    const newToken = this.getTokenFromUrl();
    this.setToken(newToken);
  }

  public render() {
    return (
      <>
        <h1>Trello login</h1>
        {this.renderLoginHeader()}
        {this.renderLoginMain()}
      </>
    );
  }
}
