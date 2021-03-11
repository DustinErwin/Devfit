import React from "react";
import DevBtn from "../../commonComponents/devButton/devButton";
import "./styles.css";
import tConvert from "../../../utilities/convertTime";
import AuthenticationButton from "../../authenticationButton/logoutButton/logoutButton";


function InfoBoxLeftColumn(props) {
  console.log(props.allTrainers);
  return (
    <>
      <h2 className="mb-4 mt-3">Trainers</h2>
      {props.allTrainers.map((item) => {
        return (
          <div className="trainer-wrapper">
            <li className="list-item mb-3 ">
              {" "}
              <DevBtn styleClass="btn-dark mr-4 ">View</DevBtn>{" "}
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
