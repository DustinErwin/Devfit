import React from "react";
import DevBtn from "../../commonComponents/devButton/devButton";
import "./styles.css";
import tConvert from "../../../utilities/reusableFunctions/convertTime";
import AuthenticationButton from "../../authenticationButton/logoutButton/logoutButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function InfoBoxLeftColumn(props) {
  return (
    <div className="left-column ">
      <h2 className="mt-5 mb-4 trainer-name">Hi {props.firstName}!</h2>
      <p>
        You are currently teaching {props.numClassesTaught}{" "}
        {props.numClassesTaught === 1 ? "class" : "classes"} this week!
      </p>
    
        {props.userClasses.map((singleClass, i) => {
          const convertedTime = tConvert(singleClass.start_time);

          return (
            <Row key={i}>
              <Col xs="4" className=" mb-4 roster-col" key={i}>
                <DevBtn
                  styleClass="btn-dark"
                  id={singleClass.id}
                  onClick={props.updateRoster}
                >
                  Roster
                </DevBtn>{" "}
              </Col>
              <Col xs="8" className= "class-text-col">
                <p className=" ">
                  {singleClass.day}, {singleClass.class_name}, at{" "}
                  {convertedTime} <span> </span>
                </p>{" "}
              </Col>
            </Row>
          );
        })}
    
      <div>
        <DevBtn styleClass="btn-dark mr-3" onClick={props.toggleAddClass}>
          Add Class
        </DevBtn>
        <AuthenticationButton />
      </div>
    </div>
  );
}

export default InfoBoxLeftColumn;
