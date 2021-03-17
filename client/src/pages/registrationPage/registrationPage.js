import React, { useState } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import RegistrationForm from "../../components/Forms/RegistrationForm";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./registrationPage.css";
import { useAuth0 } from "@auth0/auth0-react";

function RegistrationPage() {
  const { user } = useAuth0();
  
  const [users, setUser] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    phone: "",
    role: "member",
    email: user.email,
  });

  const userInfo = (event) => {
    const { name, value } = event.target;
    setUser({
      ...users,
      [name]: value,
    });
  };

  const handleRegistrationSubmit = () => {

    fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((response) => response.json())
      .then((users) => {
        console.log("Success:", users);
        window.location.href = window.location.origin;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Header />
      <Container className="regPage" >
        <h1>You're almost there! </h1>
        <h3>Enter your information to become a member!</h3>
        <Card>
          <RegistrationForm  handleRegistrationSubmit={() => handleRegistrationSubmit()} userInfo={(e) => userInfo(e)}></RegistrationForm>
        </Card>
      </Container>

      <Footer />
    </>
  );
}

export default RegistrationPage;
