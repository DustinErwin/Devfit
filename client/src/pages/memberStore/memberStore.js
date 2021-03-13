import React from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import Store from "../../components/StoreComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./memberStoreStyles.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
import jumpRope from "../../assets/images/store/jumpRope.jpg";
// import storeHeadingPhoto from "../../assets/images/store/storeHeadingPhoto.jpg";
// import { Icon } from "react-bootstrap-icons";

function memberStore() {
  //shop code credit:  https://dev.to/papasanto/build-a-react-hooks-shopping-cart-with-usestate-and-useeffect-39hk
  return (
    <>
      <Header />
      <Container className="memberStore text-center">
        <h1 className="text-red">
          Dev Fit Member Store
          {/* <img
            src={storeHeadingPhoto}
            className="ml-2"
            alt="sneakers, weight, jump rope"
          ></img> */}
        </h1>

        <Row>
          <Col xs={10}>
            <Container className="border border-dark">
              <Card className="my-3" border="danger" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={jumpRope} />
                <Card.Body>
                  <Card.Title>Jump Rope</Card.Title>
                  <Card.Text>
                    Tangle Free Jump Rope With Ball Bearings
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>$20</ListGroupItem>
                  <ListGroupItem>Quantity</ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Card.Link href="#">
                    <Button>Card Link</Button>
                  </Card.Link>
                </Card.Body>
              </Card>
            </Container>
          </Col>
          <Col xs={2}>
            <Container className="border border-danger storeCart">
              This is where the cart will go
            </Container>
          </Col>
        </Row>
      </Container>
      {/* <Icon.cart3></Icon.cart3> */}
      <Store></Store>
      <Footer />
    </>
  );
}

export default memberStore;
