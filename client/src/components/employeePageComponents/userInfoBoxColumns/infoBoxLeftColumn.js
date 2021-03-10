import React from "react";
import DevBtn from "../../../components/commonComponents/devButton/devButton";
import "./styles.css";
import tConvert from "../../../utilities/convertTime";
import AuthenticationButton from "../../authenticationButton/logoutButton/logoutButton";

function InfoBoxLeftColumn(props) {
  return (
    <div className="left-column">
      <h2 className="mt-5 mb-4 trainer-name">Hi {props.firstName}!</h2>
      <p>
        You are currently teaching {props.numClassesTaught}{" "}
        {props.numClassesTaught === 1 ? "class" : "classes"} this week!
      </p>
      {props.userClasses.map((singleClass) => {
        const convertedTime = tConvert(singleClass.start_time);

        return (
          <>
            <div
              className="trainers-class mb-3"
              key={singleClass.start_time + singleClass.day}
            >
              <p className="mr-3 trainer-class-p">
                - {singleClass.day}, {singleClass.class_name}, at{" "}
                {convertedTime} -{" "}
                <span>
                  {" "}
                  <DevBtn
                    styleClass="btn-dark"
                    id={singleClass.id}
                    onClick={props.updateRoster}
                  >
                    Roster
                  </DevBtn>{" "}
                </span>
              </p>{" "}
            </div>
          </>
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
