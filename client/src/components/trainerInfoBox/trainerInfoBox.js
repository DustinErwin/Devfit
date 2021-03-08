import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./styles.css";
import getFirstName from "../../utilities/getFirstName";

function TrainerInfoBox() {
  const [userData, setUserData] = useState({});
  const [userClasses, setUserClasses] = useState([]);

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
        const userFirstName = getFirstName(res[0]);

        //0 index is trainer name, so res -1 gets class number.
        const classesTaught = res.length - 1;

        //clone, then drop the first index so all we are left with are classes. (since first index is trainer name)
        const classesArray = [...res];
        classesArray.shift();

        setUserClasses(classesArray);
        setUserData({
          firstName: userFirstName,
          numClassesTaught: classesTaught,
        });
      });
  }

  useEffect(() => {
    //on page load, fetch the schedule data
    fetchUserData();
  }, []);

  return (
    <Row>
      <Col className="trainer-info-box">
        <h2 class="mt-5 mb-5 trainer-name">Hi {userData.firstName}!</h2>
        <p>
          You are currently teaching {userData.numClassesTaught} classes this
          week!
        </p>
      </Col>
      <Col>Some other stuff here</Col>
    </Row>
  );
}

export default TrainerInfoBox;
