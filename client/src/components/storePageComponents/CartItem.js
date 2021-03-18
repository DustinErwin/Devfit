import React from "react";

function CartItem(props) {
  const { item } = props;
  return (
    <tr>
      <td className="text-left">{item.product_name}</td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td>${item.price * item.quantity}</td>
    </tr>
  );
}

export default CartItem;
