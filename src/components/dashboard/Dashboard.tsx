import React from "react";
import { RouteChildrenProps } from "react-router";
// import s from "./style.module.scss";

interface DashboardProps extends RouteChildrenProps {
  hello?: string;
  token?: string;
}

export class Dashboard extends React.Component<DashboardProps> {
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return <h2 onClick={this.goBack}>This is Dashboard!</h2>;
  }
}
