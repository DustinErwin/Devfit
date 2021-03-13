import React from "react";
// Context containing current user info

const storeContext = React.createContext([
  // Following object expected from front-end
  {
    member_id: "",
    order_details: [
      {
        product_id: "",
        price: "",
        quantity: "",
      },
      {
        product_id: "",
        price: "",
        quantity: "",
      },
    ],
    purchase_method: "",
  },
]);

export default storeContext;
