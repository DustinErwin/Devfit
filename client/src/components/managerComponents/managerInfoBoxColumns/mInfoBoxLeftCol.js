import React, { useState } from "react";
import DevBtn from "../../commonComponents/devButton/devButton";
import "./styles.css";
import AuthenticationButton from "../../authenticationButton/logoutButton/logoutButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

function InfoBoxLeftColumn(props) {
  //Modal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Row>
        <Col xs="12" className="mb-4 mt-4">
          <h3>Trainers</h3>
        </Col>
      </Row>
      {props.allTrainers.map((item, i) => {
        return (
          <Row key={i}>
            <Col xs="5" key={i} className="view-col mb-3">
              {" "}
              <DevBtn
                id={item._id}
                styleClass="btn-dark mr-4"
                onClick={(e) => props.trainerSelect(e)}
              >
                View
              </DevBtn>{" "}
            </Col>

            <Col xs="7" className="trainer-col">
              {`${item.first_name}  ${item.last_name}`}{" "}
            </Col>
          </Row>
        );
      })}

      <Row className="mt-3 flex justify-content-center">
        <DevBtn onClick={handleShow} styleClass="btn-dark">
          Orders
        </DevBtn>
        <DevBtn
          styleClass="btn-dark ml-3 mr-3"
          onClick={props.toggleAddTrainer}
        >
          Add Trainer
        </DevBtn>{" "}
        <AuthenticationButton />
      </Row>
      <div>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Orders</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
          </Modal.Body>
          <Modal.Footer>
            <DevBtn styleClass="btn-red" onClick={handleClose}>
              Close
            </DevBtn>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default InfoBoxLeftColumn;
