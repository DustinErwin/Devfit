import React from "react";
import Col from "react-bootstrap/Col";
import "./styles.css";
import DevBtn from "../button";

//TODO: Basic Framework Created. Still need to add Api Call and show classes signed up for.
function MemberInfoBox() {
  return (
    <Col className="red-box col-12 col-md-6 text-center mb-5 mb-md-0 pb-5 ">
      <h2 className="mt-5 mb-5">Hello Instert Dynamic Name Here!</h2>
      <p>
        Your are currently signed up for
        <span className="number-of-classes-taken">
          <b></b>
        </span>{" "}
        <span className="sentence-text-classes"></span>
      </p>
      <div className="classes-taken"></div>

      <DevBtn styleClass="btn-dark">Log Out</DevBtn>
    </Col>
  );
}

export default MemberInfoBox;
