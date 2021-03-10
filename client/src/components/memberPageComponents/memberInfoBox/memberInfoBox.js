import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import "./styles.css";
import UserContext from "../../../utilities/userContext";
import AuthenticationButton from "../../authenticationButton";

//TODO: Basic Framework Created. Still need to add Api Call and show classes signed up for.
function MemberInfoBox(props) {
  const user = useContext(UserContext);
  const classAmount = props.classesJoined.length;

  return (
    <Col className="red-box col-12 col-md-6 text-center mb-5 mb-md-0 pb-5 ">
      <h2 className="mt-5 mb-5">Hi, {user.firstName}</h2>
      <p>
        Your are currently signed up for
        <span className="number-of-classes-taken">
          <b></b>
        </span>{" "}
        <span className="sentence-text-classes">{classAmount}</span> class(es)
        this week.
      </p>
      <div className="classes-taken">Zuumba, 10 AM on Friday </div>

      <AuthenticationButton />
    </Col>
  );
}

export default MemberInfoBox;
