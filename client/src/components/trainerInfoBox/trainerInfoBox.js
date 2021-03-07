import React, {useEffect, useState} from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./styles.css";
import getFirstName from "../../utilities/getFirstName"

function TrainerInfoBox() {

    const [userData, setUserData] = useState("");
    
    function fetchUserData() {
        fetch("/api/employee/604551ad344b442bf4250f61/schedule", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
           
            //function in utils folder. takes a full name and returns first 
          const userFirstName = getFirstName(res[0])

          //0 index is trainer name, so res -1 gets class number
          const classesTaught = res.length-1
         
         

          setUserData({userName:userFirstName, numClassesTaught: classesTaught })
          });
      }



      useEffect(() => {
        //on page load, fetch the schedule data
        fetchUserData();
      }, []);

    
  return(
  <Row>
    <Col className="trainer-info-box" >
      <h2 class="mt-5 mb-5 trainer-name">Hi {userData[0]}!</h2>
      <p>You are currently teaching {userData.length -1 } classes this week!</p>
    </Col>
    <Col>Some other stuff here</Col>
  </Row>
  )}

export default TrainerInfoBox;
