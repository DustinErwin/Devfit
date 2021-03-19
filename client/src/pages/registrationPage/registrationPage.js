import React, { useState } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import RegistrationForm from "../../components/Forms/RegistrationForm";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./registrationPage.css";
import { useAuth0 } from "@auth0/auth0-react";
import { set } from "date-fns";

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
      .then(() => {
        window.location.href = window.location.origin;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Header />
      <Container fluid="lg" className=" p-0">
        <h1 className="text-center  mb-4">
          Welcome to <span className="txt-red no-wrap">Dev Fitness</span>{" "}
        </h1>
        <h4 className="text-center">
          Enter your information to become a member!
        </h4>
        <Card>
          <RegistrationForm
            handleRegistrationSubmit={() => handleRegistrationSubmit()}
            userInfo={(e) => userInfo(e)}
          ></RegistrationForm>
        </Card>
      </Container>

      <Footer />
    </>
  );
}

export default RegistrationPage;
