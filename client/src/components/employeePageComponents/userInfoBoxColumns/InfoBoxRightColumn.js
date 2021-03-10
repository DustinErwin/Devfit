import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "./styles.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import DevBtn from "../../commonComponents/devButton/devButton";


function InfoBoxRightColumn(props) {
  const [fitClassName, setFitClassName] = useState("");
  const [weekday, setWeekday] = useState("Monday");
  const [classTime, setClassTime] = useState("06:00:00:00");
  const [maxSize, setMaxSize] = useState(10);

  

  // on Create Class click, create the new class, update the left col and schedule, then return to roster
  function handleClassCreation() {
    const classData = {
      class_name: fitClassName,
      day: weekday,
      start_time: classTime,
      trainer_id: props.trainerId,
    };

    fetch("/api/employee/addClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classData),
    })
      .then((response) => response.text())
      .then(() => {
        props.fetchScheduleData();
        props.fetchTrainerData();
      });

 
  }
 


  //Ternery using toggleAddClass state in parent. Change Value in state to change right Col
  return props.displayAddClass === 'roster' ? (
    <Card className="view-roster mb-5 mt-5">
      <Card.Body>
        <Card.Title>Roster</Card.Title>
        <Card.Text>
          {/* receives an array of members as a prop and renders them as card text */}
          {props.rosterList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  ) : (
    <Card className="add-class mb-3 mt-3 pb-3">
      {" "}
      <Card.Header>Add Class</Card.Header>
      <Row>
        <Col className="col-6">
          <Form.Group>
            <p>Class Name</p>
            <Form.Control
              type="text"
              placeholder="Class Name"
              onChange={(e) => setFitClassName(e.target.value)}
            />
            <br />
            <p>WeekDay</p>
            <Form.Control
              as="select"
              onChange={(e) => setWeekday(e.target.value)}
            >
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </Form.Control>
            <br />
          </Form.Group>
        </Col>
        <Col className="col-6">
          <Form.Group>
            <p>Max Class Size</p>
            <Form.Control
              as="select"
              onChange={(e) => setMaxSize(e.target.value)}
            >
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
              <option>20</option>
            </Form.Control>
            <br />
            <p>Class Start Time</p>
            <Form.Control
              as="select"
              onChange={(e) => setClassTime(e.target.value)}
            >
              <option>06:00:00:00</option>
              <option>07:00:00:00</option>
              <option>08:00:00:00</option>
              <option>09:00:00:00</option>
              <option>10:00:00:00</option>
              <option>11:00:00:00</option>
              <option>12:00:00:00</option>
              <option>13:00:00:00</option>
              <option>14:00:00:00</option>
              <option>15:00:00:00</option>
              <option>16:00:00:00</option>
              <option>17:00:00:00</option>
              <option>18:00:00:00</option>
            </Form.Control>
            <br />
          </Form.Group>
        </Col>
      </Row>
      <DevBtn styleClass="btn-red" onClick={handleClassCreation}>
        Create Class
      </DevBtn>
    </Card>
  );
}

export default InfoBoxRightColumn;
