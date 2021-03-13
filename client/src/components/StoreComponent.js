import { Button } from "react-bootstrap";
import { el } from "date-fns/locale";
import React, { useState, useEffect, useContext } from "react";
import { ListGroupItem } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import jumpRope from "../assets/images/store/jumpRope.jpg";

const Store = (props) => {
  // const contextStoreItems = useContext(storeContext);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [productList, setProductList] = useState({ product: [] });

  useEffect(() => {
    const products = fetch("/api/store/productList");
    products
      .then((response) => response.json())
      .then((response) =>
        setProductList(() => {
          return { product: response };
        })
      );
  }, []);
  console.log(productList);
  //fetch to get product list from API - useEffect to come up on page load
  //map out items to individual item cards
  //post items in cart to API to get total on backend
  //Display total on front end.

  // Following object expected from front-end
  // {
  //   member_id:"",
  //   order_details:[{
  //     product_id:"",
  //     price:,
  //     quantity:
  //   },{
  //     product_id:"",
  //     price:,
  //     quantity:
  //   }],
  //   purchase_method:""
  // }

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      {`${el.name}: $${el.price}`}
      <input type="submit" value="remove" onClick={() => removeFromCart(el)} />
    </div>
  ));

  return (
    <>
      <Container className="border border-dark storeContainer">
        {productList.product.map((el) => (
          <Card
            key={el.id}
            className="my-3"
            border="danger"
            style={{ width: "18rem" }}
          >
            <Card.Img variant="top" src={jumpRope} />
            <Card.Body>
              <Card.Title>{el.name}</Card.Title>
              <Card.Text>{el.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>${el.price}</ListGroupItem>
              <ListGroupItem>Qty: {el.quantity}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">
                <Button>Random Button TBD</Button>
              </Card.Link>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Store;

// import React, { Component } from "react";
// import "./index.css";

// class inputPage extends Component {
//   state = {
//     value: 0
//   }

//   decrease = () => {
//     this.setState({ value: this.state.value - 1 });
//   }

//   increase = () => {
//     this.setState({ value: this.state.value + 1 });
//   }

//   render() {
//     return (
//         <div className="def-number-input number-input">
//           <button onClick={this.decrease} className="minus"></button>
//           <input className="quantity" name="quantity" value={this.state.value} onChange={()=> console.log('change')}
//           type="number" />
//           <button onClick={this.increase} className="plus"></button>
//         </div>
//       );
//   }
// }

// export default inputPage;
