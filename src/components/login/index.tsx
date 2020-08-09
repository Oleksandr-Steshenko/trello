import React from "react";

const {
  REACT_APP_API_KEY,
  REACT_APP_REDIRECT_URL,
  REACT_APP_EXPIRATION_TIME,
  REACT_APP_SCOPE
} = process.env;

const appName = "Trello_App";
const requestUrl = `https://trello.com/1/authorize?return_url=${REACT_APP_REDIRECT_URL}?expiration=${REACT_APP_EXPIRATION_TIME}&name=${appName}&scope=${REACT_APP_SCOPE}&response_type=token&key=${REACT_APP_API_KEY}`;

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <a href={requestUrl}>Login</a>
        <h2>Please login!</h2>
      </div>
    );
  }
}
