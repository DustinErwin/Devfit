import React from "react";
import DevBtn from "../../commonComponents/devButton/devButton";
import "./styles.css";
import tConvert from "../../../utilities/convertTime";
import AuthenticationButton from "../../authenticationButton/logoutButton/logoutButton";
import Card from 'react-bootstrap/Card'

function InfoBoxRightColumn(props) {
  return (
   <Card className="trainer-info-card mt-4">
     <Card.Title className=" trainer-info-title text-center mt-3">Trainer Information</Card.Title>
     <Card.Body >
       <Card.Text>
    <ul class="list-group list-group-flush text-start rounded">
    <li class="list-group-item trainerFirstName">First Name: <span class="ml-1">{props.viewedTrainer[0].first_name}</span>  </li>
    <li class="list-group-item trainerLastName">Last Name: <span class="ml-1">{props.viewedTrainer[0].last_name}</span> </li>
    <li class="list-group-item trainerGender">Gender:<span class="ml-1">{props.viewedTrainer[0].gender}</span> </li>
    <li class="list-group-item trainerEmail">Email Address: <span class="ml-1">{props.viewedTrainer[0].email}</span></li>
    <li class="list-group-item trainerPhone">Phone Number:<span class="ml-1">{props.viewedTrainer[0].phone} </span></li>
    </ul>
    </Card.Text>
    </Card.Body>
    </Card>
    )
 
}

export default InfoBoxRightColumn;
