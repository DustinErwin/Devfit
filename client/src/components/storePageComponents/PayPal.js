import React, { useRef, useEffect, useState, useContext } from "react";
import UserContext from "../../utilities/userContext";

// PayPal button code credit: https://www.youtube.com/watch?v=IXxEdhA7fig

export default function PayPal(props) {
  const userInfo = useContext(UserContext);
  const [paid, setPaid] = useState(false);
  const [orderId, setOrderId]= useState("");
  const paypal = useRef();

  useEffect(() => {
    const {total, items} = props;
    const itemArray = [];
    items.forEach(orderItem => {
      const item = {};
      item.name = orderItem.product_name;
      item.quantity = orderItem.quantity;
      item.unit_amount = {currency_code: "USD", value: orderItem.price};
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
                      value: total
                    }
                  }
                },
                items: itemArray,
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          //console.log("onApprove data-> ", data, " actions-> ", actions);
          const order = await actions.order.capture();
          //Add modal to say "Thank you for your order."
          //Clear screen (so that paypal button doesn't duplicate afterward)
          alert(order.id);
          setPaid(true);
          setOrderId(order.id);

          let orderdata = { member_id: userInfo._id, order_details: [...items], purchase_method: "Paypal" };
          console.log("orderdata", orderdata);
          fetch("/api/store/order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(orderdata),
          }).then((resp) => {
            console.log("Saved the Order to the DB", resp);
          }).catch(err => console.log("Error saving the order ", err));
      
        },
        onError: (err) => {
          console.log("onError err-> ", err);
        },
      })
      .render(paypal.current);
  }, []);

  if (paid) {
    return (<div>
      <h4>Created Order {orderId}</h4>
    </div>);
  }

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
