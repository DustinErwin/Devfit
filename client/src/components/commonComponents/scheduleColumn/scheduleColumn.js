import React from "react";
import Col from "react-bootstrap/Col";
import "./styles.css";

function ScheduleColumn(props) {

  return (
    <>
      <Col xs={12} md={6} lg  className=" pb-5 pt-3 pl-2 pr-2">
        <div className="schedule-column" >
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
