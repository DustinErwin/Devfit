import React from "react";
// Context containing current user info

const ClassContext = React.createContext({
  _id: "",
  className: "",
  day: "",
  startTime: "",
  currentSize: 0,
  maxSize: 0,
  trainerId: "",
  trainerName: "",
  classesJoined: [],
});

export default ClassContext;
