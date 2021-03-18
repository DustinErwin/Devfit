import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import CartItem from "./CartItem";
import PayPal from "./PayPal";
import DevBtn from "../commonComponents/devButton/devButton";
import StoreContext from "../../utilities/storeContext";

function Cart(props) {
  const { cartItems } = props;
  const cartData = cartItems.filter((item) => item.quantity > 0);
  const cartTotal = cartItems.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

  const { checkout, setCheckOut } = useContext(StoreContext);

  return (
    <Table responsive>
      <thead>
        <tr>
          <th className="text-left">Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        {cartData.map((cartItem) => {
          return <CartItem item={cartItem} key={cartItem.product_id} />;
        })}
      </tbody>
      <tfoot>
        <tr>
          <td className="text-left" colSpan="3">
            <b>Total</b>
          </td>
          <td>${cartTotal}</td>
        </tr>
        <tr>
          <td colSpan="4" className="text-right">
            {checkout ? (
              <PayPal total={cartTotal} items={cartData} />
            ) : (
              <div className="d-flex justify-content-center">
                <DevBtn
                  styleClass="btn-dark d-flex"
                  onClick={() => {
                    setCheckOut(true);
                  }}
                  disableBtn={cartTotal === 0}
                >
                  Checkout
                </DevBtn>
              </div>
            )}
          </td>
        </tr>
      </tfoot>
    </Table>
  );
}

export default Cart;
