import React from "react";
import "./styles.css";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function ScheduleClass(props) {
  return (
    
    <Row className="m-0 pb-3 pt-3 border-to-bottom-thin ">
      <Col xs={12} className="col border-teal border-to-right pb-3 text-center">
        <h4 className=" bold text-red">{props.fitClassName} </h4>
        <div>{props.classTime}</div>
        <div>{props.classTrainer}</div>
        <div>slots left {props.spotsLeft}</div>
      </Col>
      <Col xs={12} className=" center-btn border-teal border-to-right">
        {/* Props.children is here to add buttons when this component is called to make this more reusable. */}
        {props.children}
      </Col>
    </Row>
  );
}

export default ScheduleClass;
