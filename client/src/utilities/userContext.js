import React from "react";
// Context containing current user info

const UserContext = React.createContext({
  _id: "",
  email: "",
  firstName: "",
  lastName: "",
  fullName: "",
  role: "",
  gender: "",
});

export default UserContext;
