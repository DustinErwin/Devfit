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
import { Cart3 } from "react-bootstrap-icons";

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
            <Container
              className="storeCart d-flex justify-content-center"
              style={{ width: "18rem" }}
            >
              <Card className="border border-danger">
                <Cart3 className="align-self-center" size={96}></Cart3>
                <h3>Your Cart</h3>
                <ListGroup className="list-group-flush">
                  <ListGroupItem className="border border-danger">
                    Cras justo odio
                  </ListGroupItem>
                  <ListGroupItem className="border border-danger">
                    Dapibus ac facilisis in
                  </ListGroupItem>
                  <ListGroupItem className="border border-danger">
                    Vestibulum at eros
                  </ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>

      <Store></Store>
      <Footer />
    </>
  );
}

export default memberStore;
