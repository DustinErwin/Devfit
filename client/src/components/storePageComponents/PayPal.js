import React, { useRef, useEffect, useState, useContext } from "react";
import UserContext from "../../utilities/contexts/userContext";
import Modal from "react-bootstrap/Modal";
import DevBtn from "../commonComponents/devButton/devButton";
import { Redirect } from "react-router";
import StoreContext from "../../utilities/contexts/storeContext";

// PayPal button code credit: https://www.youtube.com/watch?v=IXxEdhA7fig

export default function PayPal(props) {
  const [sendClasses, setSendClasses] = useState();
  const userInfo = useContext(UserContext);
  const { setCheckOut } = useContext(StoreContext);
  const [orderId, setOrderId] = useState("");
  const paypal = useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const onModalClose = () => {
    handleClose();
    setSendClasses(<Redirect to={`/member`} />);
  };

  useEffect(() => {
    const { total, items } = props;
    const itemArray = [];
    items.forEach((orderItem) => {
      const item = {};
      item.name = orderItem.product_name;
      item.quantity = orderItem.quantity;
      item.unit_amount = { currency_code: "USD", value: orderItem.price };
      item.sku = orderItem.product_id;
      console.log("item => ", item);
      itemArray.push(item);
    });
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          //console.log("createOrder data-> ", data, " actions-> ", actions, " err-> ", err);
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Item being purchased",
                amount: {
                  currency_code: "USD",
                  value: total,
                  breakdown: {
                    item_total: {
                      currency_code: "USD",
                      value: total,
                    },
                  },
                },
                items: itemArray,
              },
            ],
          });
        },
        //On order approval, return to store page, and show modal
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          const orderdata = {
            member_id: userInfo._id,
            order_details: [...items],
            purchase_method: "Paypal",
            payment_ref: order.id,
          };
          fetch("/api/store/order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(orderdata),
          })
            .then((resp) => resp.json())
            .then((resp) => {
              setOrderId(resp._id);
              setShow(true);
            })
            .catch((err) => console.log("Error saving the order ", err));
        },
        onError: (err) => {
          console.log("onError err-> ", err);
        },
        onCancel: function (data) {
          // Show a cancel page, or return to cart
          setCheckOut(false);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      {show ? <h3>Order Processed!</h3> : <div ref={paypal}></div>}
      <Modal show={show} onHide={onModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Processed!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thank you for your order! Your Order Id is {orderId}
        </Modal.Body>
        <Modal.Footer>
          <DevBtn styleClass="btn-red" onClick={onModalClose}>
            Close
          </DevBtn>
          {sendClasses ? sendClasses : null}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
