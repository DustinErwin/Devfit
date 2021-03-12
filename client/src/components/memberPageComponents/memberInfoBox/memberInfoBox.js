import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import "./styles.css";
import UserContext from "../../../utilities/userContext";
import AuthenticationButton from "../../authenticationButton";
import convertTime from "../../../utilities/convertTime";

//TODO: Basic Framework Created. Still need to add Api Call and show classes signed up for.
function MemberInfoBox(props) {
  const user = useContext(UserContext);
  const classesJoined = props.classesJoined || [];
  const classAmount = classesJoined.length;
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
      <div className="classes-taken">
        {classesJoined.map((unit) => {
          return (
            <p key={unit.id}>
              {unit.class_name} at {convertTime(unit.start_time)} on {unit.day}
            </p>
          );
        })}
      </div>

      <AuthenticationButton />
    </Col>
  );
}

export default MemberInfoBox;
