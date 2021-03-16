import React from "react";
import DevBtn from "../../commonComponents/devButton/devButton";
import "./styles.css";
import AuthenticationButton from "../../authenticationButton/logoutButton/logoutButton";


function InfoBoxLeftColumn(props) {
  console.log(props)
  return (
    <>
      <h2 className="mb-4 mt-4">Trainers</h2>
      {props.allTrainers.map((item, i) => {
        return (
          <div className="trainer-wrapper" key={i}>
            <li className="list-item mb-3 ">
              {" "}
              <DevBtn id={item._id} styleClass="btn-dark mr-4" onClick={(e) =>props.trainerSelect(e)}>View</DevBtn>{" "}
              {`${item.first_name}  ${item.last_name}`}{" "} 
            </li>
          </div>    
        );
      })}
       <div className="mt-3">
       <DevBtn styleClass="btn-dark mr-3" onClick={props.toggleAddTrainer}>Add Trainer</DevBtn> <AuthenticationButton /> 
        </div>
    </>
  );
}

export default InfoBoxLeftColumn;
