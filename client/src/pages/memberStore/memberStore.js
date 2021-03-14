import React, {useState, useEffect} from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import Store from "../../components/storePageComponents/StoreComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./memberStoreStyles.css";
import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";
// import ListGroupItem from "react-bootstrap/ListGroupItem";
// import Button from "react-bootstrap/Button";
// import jumpRope from "../../assets/images/store/jumpRope.jpg";
// import storeHeadingPhoto from "../../assets/images/store/storeHeadingPhoto.jpg";
import { Cart3 } from "react-bootstrap-icons";
import Cart from "../../components/storePageComponents/Cart";

function MemberStore() {
  const [productList, setProductList] = useState({ product: [] });
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const products = fetch("/api/store/productList");
    products
      .then((response) => response.json())
      .then((response) => {
        setProductList(() => {
          return { product: response };
        });
        const initialCartArray = [];
        response.forEach(product => {
          const cartItem = {};
          cartItem.product_id = product._id;
          cartItem.product_name = product.name;
          cartItem.quantity = 0;
          cartItem.price = product.price;
          initialCartArray.push(cartItem);
        });
        setCart(initialCartArray);
      });
  }, []);

  const handleUpdateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map(item => (item.product_id === productId ? { ...item, quantity: newQuantity } : item));
    setCart(updatedCart);
  }

  //shop code credit:  https://dev.to/papasanto/build-a-react-hooks-shopping-cart-with-usestate-and-useeffect-39hk
  return (
    <>
      <Header />
      <Container fluid className="memberStore text-center">
        <h1 className="text-red">
          Dev Fit Member Store
          {/* <img
            src={storeHeadingPhoto}
            className="ml-2"
            alt="sneakers, weight, jump rope"
          ></img> */}
        </h1>

        <Row>
          <Col xs={8}>
            <Store productList={productList} cartHandler={handleUpdateQuantity}></Store>
          </Col>
          <Col xs={4}>
            {/* <Row className="storeCart d-flex justify-content-center" style={{ width: "18rem" }}>
              <Col>
              <Cart3 className="align-self-center" size={96}></Cart3>
                <h3>Your Cart</h3>
              </Col>
            </Row>
            <Row>
            <Cart cartItems={cart} />
            </Row> */}
            <Container
              className="storeCart d-flex justify-content-center"
              // style={{ width: "18rem" }}
            >
              <Card className="border border-danger">
                <Cart3 className="align-self-center" size={96}></Cart3>
                <h3>Your Cart</h3>
                {/* <ListGroup className="list-group-flush">
                  <ListGroupItem className="border border-danger">
                    Cras justo odio
                  </ListGroupItem>
                  <ListGroupItem className="border border-danger">
                    Dapibus ac facilisis in
                  </ListGroupItem>
                  <ListGroupItem className="border border-danger">
                    Vestibulum at eros
                  </ListGroupItem>
                </ListGroup> */}
                <Card.Body>
                  {/* <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link> */}
                  <Cart cartItems={cart} />

                </Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default MemberStore;
