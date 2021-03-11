import React from "react";
import DevBtn from "../../commonComponents/devButton/devButton";
import "./styles.css";
import tConvert from "../../../utilities/convertTime";
import AuthenticationButton from "../../authenticationButton/logoutButton/logoutButton";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"


function InfoBoxLeftColumn(props) {
  console.log(props.allTrainers)
  return (
    <>
    <h2 className= "mb-3 mt-3">Trainers</h2>
    {props.allTrainers.map((item) => {
     return <div className="trainer-wrapper">
     <p className=""> <DevBtn styleClass="btn-dark mr-4 ">View</DevBtn> {`${item.first_name}  ${item.last_name}`} </p>
     </div>
    })}
  
  </>)
}

export default InfoBoxLeftColumn;
