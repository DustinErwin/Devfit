import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import DevBtn from "../commonComponents/devButton/devButton";
import { Redirect } from "react-router";

// PayPal button code credit: https://www.youtube.com/watch?v=IXxEdhA7fig

export default function PayPal() {
  const paypal = useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Item being purchased",
                amount: {
                  currency_code: "USD",
                  value: 100.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture().then(function (details) {
            setShow(true);
          });

          //Clear screen (so that paypal button doesn't duplicate afterward)

          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Processed!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank you for your order!</Modal.Body>
        <Modal.Footer>
          <DevBtn styleClass="btn-red" onClick={handleClose}>
            Close
          </DevBtn>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
