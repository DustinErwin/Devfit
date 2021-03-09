import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import AuthenticationButton from "../../components/authenticationButton";
import RegistrationForm from "../../components/Forms/RegistrationForm";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./registrationPage.css";

function RegistrationPage() {
  return (
    <>
      <Header />
      <Container className="regPage">
        <h1>Sign Up for an Account:</h1>
        <Card>
          <RegistrationForm></RegistrationForm>
        </Card>
        <AuthenticationButton />
      </Container>
      <Footer />
    </>
  );
}

export default RegistrationPage;
