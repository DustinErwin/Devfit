import React from "react";

function TableRow(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>${props.price}</td>
      <td>{props.quantity}</td>
      <td>${props.total}</td>
    </tr>
  );
}

export default TableRow;
