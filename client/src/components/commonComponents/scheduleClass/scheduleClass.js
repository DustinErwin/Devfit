import React from "react";
import "./styles.css";

function ScheduleClass(props) {
  return (
    <div className="row m-0 pb-3 pt-3 border-to-bottom-thin font-large">
      <div className="col border-teal pb-3 text-center">
        <h4 className=" bold text-red">{props.fitClassName} </h4>
        <div>{props.classTime}</div>
        <div>{props.classTrainer}</div>
        <div>slots left {props.spotsLeft}</div>
      </div>
      <div className="col border-to-right border-teal d-flex">
        {/* Props.children is here to add buttons when this component is called to make this more reusable. */}
        {props.children}
      </div>
    </div>
  );
}

export default ScheduleClass;
