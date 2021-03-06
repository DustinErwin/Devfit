import React from "react";
// Context containing current user info

const UserContext = React.createContext({
  email: "",
  firstName: "",
  lastName: "",
  fullName: "",
  role: "",
  gender: "",
});

export default UserContext;
