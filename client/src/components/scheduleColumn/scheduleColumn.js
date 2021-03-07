import React from "react";
import Col from "react-bootstrap/Col";
import "./styles.css";

function ScheduleColumn(props) {

  return (
    <>
      <Col className="col-sm-12 col-md-6 col-lg pt-2 ">
        <div className="schedule-column">
          <h3> {props.dayOfWeek} </h3>
          <p className=" pb-2">{props.todaysDate}</p>
        </div>
        <div> 
          {props.children}
        </div>
      </Col>
    </>
  );
}

export default ScheduleColumn;
