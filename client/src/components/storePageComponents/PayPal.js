import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import DevBtn from "../commonComponents/devButton/devButton";
import { Redirect } from "react-router";

// PayPal button code credit: https://www.youtube.com/watch?v=IXxEdhA7fig

export default function PayPal() {
  //order complete modal variable(s)
  const [sendClasses, setSendClasses] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //Paypal button variable(s)
  const paypal = useRef();

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
        //On order approval, return to store page, and show modal
        onApprove: async (data, actions) => {
          const order = await actions.order.capture().then(function (details) {
            setShow(true);
          });

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
          <DevBtn
            styleClass="btn-red"
            onClick={() => {
              handleClose();
              setSendClasses(<Redirect to={`/member`} />);
            }}
          >
            Close
          </DevBtn>
          {sendClasses ? sendClasses : null}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
