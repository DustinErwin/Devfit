import React from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import Store from "../../components/StoreComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./memberStoreStyles.css";

function memberStore() {
  //shop code credit:  https://dev.to/papasanto/build-a-react-hooks-shopping-cart-with-usestate-and-useeffect-39hk
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>

      {/* <Store></Store> */}
      <Footer />
    </>
  );
}

export default memberStore;
