import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import Store from "../../components/storePageComponents/StoreComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./memberStoreStyles.css";
import Card from "react-bootstrap/Card";
import { Cart3 } from "react-bootstrap-icons";
import Cart from "../../components/storePageComponents/Cart";
import IsShoppingContext from "../../utilities/isShoppingContext";
import DevBtn from "../../components/commonComponents/devButton/devButton";
import { Redirect } from "react-router";
import "../../components/commonComponents/devButton/styles.css";

function MemberStore() {
  const [sendClasses, setSendClasses] = useState();
  const { setIsShopping } = useContext(IsShoppingContext);
  const [productList, setProductList] = useState({ product: [] });
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setIsShopping(true);
    const products = fetch("/api/store/productList");
    products
      .then((response) => response.json())
      .then((response) => {
        setProductList(() => {
          return { product: response };
        });
        const initialCartArray = [];
        response.forEach((product) => {
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
    const updatedCart = cart.map((item) =>
      item.product_id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  //shop code adapted from:  https://dev.to/papasanto/build-a-react-hooks-shopping-cart-with-usestate-and-useeffect-39hk
  return (
    <>
      <Header />
      <Container fluid className="memberStore text-center">
        <Row>
          <DevBtn
            styleClass="btn-red ml-5"
            onClick={() => {
              setIsShopping(false);
              setSendClasses(<Redirect to={`/member`} />);
            }}
          >
            Back to Classes
          </DevBtn>
        </Row>
        <h1 className="text-red mb-5 align-self-center">
          Dev Fit Member Store
        </h1>

        {sendClasses ? sendClasses : null}
        <Row>
          <Col xs={8}>
            <Store
              productList={productList}
              cartHandler={handleUpdateQuantity}
            ></Store>
          </Col>
          <Col xs={4}>
            <Container className="storeCart d-flex justify-content-center">
              <Card className="border border-danger">
                <Cart3 className="align-self-center" size={96}></Cart3>
                <h3 className="mt-4">Your Cart</h3>
                <Card.Body>
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
