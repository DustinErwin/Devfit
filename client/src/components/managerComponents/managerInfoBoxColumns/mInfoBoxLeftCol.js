import React from "react";
import DevBtn from "../../commonComponents/devButton/devButton";
import "./styles.css";
import tConvert from "../../../utilities/convertTime";
import AuthenticationButton from "../../authenticationButton/logoutButton/logoutButton";


function InfoBoxLeftColumn(props) {
  return (
    <>
      <h2 className="mb-4 mt-4">Trainers</h2>
      {props.allTrainers.map((item) => {
        return (
          <div className="trainer-wrapper">
            <li className="list-item mb-3 ">
              {" "}
              <DevBtn id={item._id} styleClass="btn-dark mr-4" onClick={props.handleViewedTrainer}>View</DevBtn>{" "}
              {`${item.first_name}  ${item.last_name}`}{" "}
            </li>
          </div>    
        );
      })}
       <div className="mt-3">
          <AuthenticationButton />
        </div>
    </>
  );
}

export default InfoBoxLeftColumn;
