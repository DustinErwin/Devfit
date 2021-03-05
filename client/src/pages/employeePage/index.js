import React, { useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ContentWrapper from "../../components/contentWrapper";
import RenderScheduleHeadings from "../../utilities/render-schedule-headings";
import Row from "react-bootstrap/Row";
import AuthenticationButton from "../../components/authenticationButton";

function EmployeePage() {
  useEffect(() => {
    fetch("/api/employee/6041105aad06d732a00f6be4/classes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

  return (
    <>
      <Header />
      <AuthenticationButton />
      <ContentWrapper>This Wrapper the two boxes for employees.</ContentWrapper>

      <ContentWrapper>
        <Row>{RenderScheduleHeadings()}</Row>
      </ContentWrapper>
      <Footer />
    </>
  );
}

export default EmployeePage;
