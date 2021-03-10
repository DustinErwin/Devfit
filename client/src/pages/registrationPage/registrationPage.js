import React, { useState } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import RegistrationForm from "../../components/Forms/RegistrationForm";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./registrationPage.css";
import DevBtn from "../../components/commonComponents/devButton/devButton";
import { propTypes } from "react-bootstrap/esm/Image";

function RegistrationPage() {
  const [users, setUser] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthdate: "",
    phoneNumber: "",
  });

  const userInfo = (event) => {
    const { name, value } = event.target;
    setUser({
      ...users,
      [name]: value,
    });
  };
  console.log(users);

  // const handleRegistrationSubmit = (event) => {
  //   console.log("clicked");
  // };

  return (
    <>
      <Header />
      <Container className="regPage">
        <h1>You're almost there! </h1>
        <h3>Enter your information to become a member!</h3>
        <Card>
          <RegistrationForm userInfo={(e) => userInfo(e)}></RegistrationForm>
        </Card>
        <DevBtn className="signupBtn" styleClass="btn-red">
          Sign Up
        </DevBtn>
      </Container>

      <Footer />
    </>
  );
}

export default RegistrationPage;
