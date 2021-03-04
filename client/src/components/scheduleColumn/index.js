import React from "react";
import Col from "react-bootstrap/col";
import "./styles.css";

function ScheduleColumns(props) {


  return (
    <>
      <Col className="col-sm-12 col-md-6 col-lg pt-2 border-teal schedule-column">
        <h3 className="text-red week-day schedule-coloumn">{props.dayOfWeek} </h3>
        <p className=" pb-2 font-large">
          {props.todaysDate}
        </p>
        <div>The classes will go here</div>
      </Col>
    </>
  );
}

export default ScheduleColumns;
