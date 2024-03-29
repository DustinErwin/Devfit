import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./registrationForm.css";
import { useAuth0 } from "@auth0/auth0-react";
import DevBtn from "../../components/commonComponents/devButton/devButton";
import React, { useState } from "react";
import AuthenticationButton from "../../components/authenticationButton/logoutButton/logoutButton";

export default function RegistrationForm(props) {
  const [validated, setValidated] = useState(false);
  const { user } = useAuth0();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      event.preventDefault();
      setValidated(true);
      return false;
    }
    event.preventDefault();
    props.handleRegistrationSubmit();
    setValidated(false);
  };

  

  return (
    <>
      <Container className="regForm background-white larger-font">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Col xs={12} className="mt-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control plaintext readOnly defaultValue={user.email} />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  placeholder="First name"
                  onChange={(event) => props.userInfo(event)}
                  name="first_name"
                  type="text"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter a First Name
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  placeholder="Last name"
                  onChange={(event) => props.userInfo(event)}
                  name="last_name"
                  type="text"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter a Last Name
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  onClick={(event) => props.userInfo(event)}
                  onKeyDown={(event) => props.userInfo(event)}
                  name="gender"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formBirthdate">
                <Form.Label>Birthdate</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="Birthdate (yyyy-dd-mm)"
                  onChange={(event) => props.userInfo(event)}
                  name="date_of_birth"
                ></Form.Control>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter a Date Of Birth
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  placeholder="Phone Number"
                  pattern="[0-9]{10}"
                  onChange={(event) => props.userInfo(event)}
                  name="phone"
                ></Form.Control>
                <Form.Text className="text-muted ml-1">
                  Enter 10 digit phone with no special characters
                </Form.Text>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter 10 numeric digits with no special characters
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mb-4 mt-3">
              <DevBtn styleClass="btn-red mr-3" styleType="submit">
                Sign Up
              </DevBtn>
              <AuthenticationButton />
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
