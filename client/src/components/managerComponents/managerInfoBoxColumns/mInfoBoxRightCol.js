import React, {useState} from "react";
import DevBtn from "../../commonComponents/devButton/devButton";
import "./styles.css";
import tConvert from "../../../utilities/convertTime";
import AuthenticationButton from "../../authenticationButton/logoutButton/logoutButton";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup"

function InfoBoxRightColumn(props) {

  return (
    <>
      {" "}
      {props.toggleRightCol === "addTrainer" ? (
        <Card className="trainer-info-card mt-4">
          <Card.Title className=" trainer-info-title text-center mt-3">
            Hire New Trainer
          </Card.Title>
          <Card.Body>
            
            <Card.Text>
              <ListGroup className=" hire-trainer-form">
                <Form.Group>
                  <ListGroup.Item className="rounded-top">
                  <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      onChange={(e) => props.hireTrainerInfo(e)}
                      name="firstName"
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      onChange={(e) => props.hireTrainerInfo(e)}
                      name="lastName"
                    />
                  </ListGroup.Item>
                  <ListGroup.Item >
                  <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => props.hireTrainerInfo(e)}
                      name="gender"
                    >
                      <option>M</option>
                      <option>F</option>
                    </Form.Control>
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => props.hireTrainerInfo(e)}
              name="email"
            />
                  </ListGroup.Item>
                  <ListGroup.Item className="trainerPhone rounded-bottom pb-3">
                  <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone Number"
              onChange={(e) => props.hireTrainerInfo(e)}
              name="phone"
            />
                  </ListGroup.Item>
                </Form.Group>
              </ListGroup>
            </Card.Text>
            <div className="text-center">
            <DevBtn styleClass="btn-dark" onClick={props.handleHireNewTrainer}>Hire Trainer</DevBtn>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card className="trainer-info-card mt-4">
          <Card.Title className=" trainer-info-title text-center mt-3">
            Trainer Information
          </Card.Title>
          <Card.Body>
            <Card.Text>
              <ListGroup class="list-group list-group-flush text-start rounded">
                <ListGroup.Item class="list-group-item trainerFirstName">
                  First Name:{" "}
                  <span class="ml-1">{props.viewedTrainer[0].first_name}</span>{" "}
                </ ListGroup.Item>
                <ListGroup.Item class="list-group-item trainerLastName">
                  Last Name:{" "}
                  <span class="ml-1">{props.viewedTrainer[0].last_name}</span>{" "}
                </ ListGroup.Item>
                <ListGroup.Item class="list-group-item trainerGender">
                  Gender:
                  <span class="ml-1">{props.viewedTrainer[0].gender}</span>{" "}
                </ ListGroup.Item>
                <ListGroup.Item class="list-group-item trainerEmail">
                  Email Address:{" "}
                  <span class="ml-1">{props.viewedTrainer[0].email}</span>
                </ ListGroup.Item>
                <ListGroup.Item class="list-group-item trainerPhone">
                  Phone Number:
                  <span class="ml-1">{props.viewedTrainer[0].phone} </span>
                </ ListGroup.Item>
              </ListGroup>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default InfoBoxRightColumn;
