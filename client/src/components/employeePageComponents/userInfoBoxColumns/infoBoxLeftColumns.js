import React from "react";
import DevBtn from "../../../components/commonComponents/devButton/devButton";
import "./styles.css";

function InfoBoxLeftColumn(props) {
  return (
    <div className="left-column">
      <h2 className="mt-5 mb-4 trainer-name">Hi {props.firstName}!</h2>
      <p>
        You are currently teaching {props.numClassesTaught} classes this week!
      </p>
      {props.userClasses.map((singleClass) => {
        return (
          <div
            className="trainers-class mb-3"
            key={singleClass.start_time + singleClass.day}
          >
            <p className="mr-3 trainer-class-p">
              - {singleClass.day}, {singleClass.class_name}, at{" "}
              {singleClass.start_time} -{" "}
              <span>
                {" "}
                <DevBtn
                  styleClass="btn-dark"
                  id={singleClass.id}
                  onClick={(e) => props.handleRoster(e)}
                >
                  Roster
                </DevBtn>{" "}
              </span>
            </p>{" "}
          </div>
        );
      })}
    </div>
  );
}

export default InfoBoxLeftColumn;
