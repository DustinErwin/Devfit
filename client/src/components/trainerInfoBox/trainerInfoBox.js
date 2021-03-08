import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "./styles.css";
import getFirstName from "../../utilities/getFirstName";
import DevBtn from "../../components/button/button";
import Card from "react-bootstrap/Card";

function TrainerInfoBox() {
  const [userData, setUserData] = useState({});
  const [userClasses, setUserClasses] = useState([]);
  const [toggleRoster, setToggleRoster] = useState(true);
  const [classRoster, setClassRoster] = useState("");

//used on Roster btn click. Grabs current class roster and adds it to state so info can be displayed in card
  function fetchClassRoster(id) {
    fetch("/api/class/"+ id +"/roster", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
         setClassRoster(res)
        
      });
  }

//grabs userName and class schedule to populate schedule 
  function fetchUserData() {
    fetch("/api/employee/6046653df074fb3b2831dca9/schedule", {
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

  function handleRoster(e) {
    const classId = e.target.id 
    fetchClassRoster(classId)
  }

  return (
    <Container>
      <Row>
        <Col className="trainer-info-box col-no-gutters">
          <h2 className="mt-5 mb-4 trainer-name">Hi {userData.firstName}!</h2>
          <p>
            You are currently teaching {userData.numClassesTaught} classes this
            week!
          </p>
          {userClasses.map((singleClass) => {
            return (
              <div className="trainers-class mb-3" key={singleClass.start_time + singleClass.day} >
                <p className="mr-3 trainer-class-p">
                  - {singleClass.day}, {singleClass.class_name}, at{" "}
                  {singleClass.start_time} -
                </p>{" "}
                <DevBtn styleClass="btn-dark" id={singleClass.id} onClick={(e) => handleRoster(e)}>
                  Roster
                </DevBtn>{" "}
              </div>
            );
          })}
        </Col>
        <Col className="col-no-gutters">
          <div className="roster-container">
            <Card className="roster-card mb-5 mt-5">
              <Card.Body>
                <Card.Title>Roster</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default TrainerInfoBox;
