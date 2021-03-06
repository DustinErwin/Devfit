// Auth0 Custom hook to handle user login

import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain =
    process.env.REACT_APP_AUTH0_DOMAIN || "dev-dustin-erwin.us.auth0.com";
  const clientId =
    process.env.REACT_APP_AUTH0_CLIENT_ID || "k2k2ChfEp9RI1RsDXe0gu6e6tnQZVghd";

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
