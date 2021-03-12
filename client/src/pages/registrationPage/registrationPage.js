import React, { useState, useContext } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import RegistrationForm from "../../components/Forms/RegistrationForm";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./registrationPage.css";
import DevBtn from "../../components/commonComponents/devButton/devButton";
<<<<<<< HEAD
import { propTypes } from "react-bootstrap/esm/Image";
import userContext from "../../utilities/userContext";
=======
>>>>>>> debugging

function RegistrationPage() {
  const contextUser = useContext(userContext);
  const [users, setUser] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    phone: "",
    role: "member",
    email: contextUser.email,
  });

  const userInfo = (event) => {
    const { name, value } = event.target;
    setUser({
      ...users,
      [name]: value,
    });
  };
  // console.log(users);

  const handleRegistrationSubmit = (event) => {
    console.log("clicked");
    console.log(users);

    fetch("/api/register", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((response) => response.json())
      .then((users) => {
        console.log("Success:", users);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Header />
      <Container className="regPage">
        <h1>You're almost there! </h1>
        <h3>Enter your information to become a member!</h3>
        <Card>
          <RegistrationForm userInfo={(e) => userInfo(e)}></RegistrationForm>
        </Card>
        <DevBtn
          className="signupBtn"
          styleClass="btn-red"
          onClick={handleRegistrationSubmit}
        >
          Sign Up
        </DevBtn>
      </Container>

      <Footer />
    </>
  );
}

export default RegistrationPage;
