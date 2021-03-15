import React from "react";
// Context boolean for isShopping

const IsShoppingContext = React.createContext({
  isShopping: false,
  setIsShopping: () => {},
});

export default IsShoppingContext;
