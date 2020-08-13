import React, { FC } from "react";

import { RouteChildrenProps, Redirect } from "react-router";

import { ROUTES_URLS } from "../app/routes";

interface OAuthProps extends RouteChildrenProps {
  onSetToken: (token: string) => void;
}

export const OAuth: FC<OAuthProps> = ({
  location: { hash },
  onSetToken
}: OAuthProps) => {
  const token = hash.split("=")[1];
  onSetToken(token);
  return <Redirect to={ROUTES_URLS.DASHBOARD} />;
};
