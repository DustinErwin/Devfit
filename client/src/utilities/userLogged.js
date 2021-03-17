import React from "react";
// Context containing current user info

const UserLogged = React.createContext({
  userLogged: false,
  setUserLogged: () => {},
});

export default UserLogged;
