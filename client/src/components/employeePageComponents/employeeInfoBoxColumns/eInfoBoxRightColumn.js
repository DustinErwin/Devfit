import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "./styles.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import DevBtn from "../../commonComponents/devButton/devButton";

function InfoBoxRightColumn(props) {
  const [fitClassName, setFitClassName] = useState("");
  const [weekday, setWeekday] = useState("Monday");
  const [classTime, setClassTime] = useState("06:00:00:00");
  const [maxSize, setMaxSize] = useState(10);
  const [validated, setValidated] = useState(false);

  // on Create Class click, create the new class, update the left col and schedule, then return to roster
  function handleClassCreation() {
    const classData = {
      class_name: fitClassName,
      day: weekday,
      start_time: classTime,
      trainer_id: props.trainerId,
      max_size: maxSize,
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

  //Bootstrap validation

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    handleClassCreation();
    setValidated(true);
  };

  //Ternery using toggleAddClass state in parent. Change Value in state to change right Col
  return props.displayAddClass === "roster" ? (
    <Card className="view-roster mb-3 mt-4">
      <Card.Body>
        <Card.Title>Roster</Card.Title>
        <Card.Text>
          {/* receives an array of members as a prop and renders them as card text */}
          {props.rosterList.map((item) =>
            item.length === 0 ? (
              <p>No one signed up yet!</p>
            ) : (
              <li className="list-item" key={item}>
                {item}{" "}
              </li>
            )
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  ) : (
    <Card className="add-class mb-3 mt-3 pb-3 pt-3">
      {" "}
      <Form noValidate validated={validated}>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Class Name</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => setFitClassName(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter a Class Name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Weekday</Form.Label>
            <Form.Control
              required
              as="select"
              onChange={(e) => setWeekday(e.target.value)}
            >
              {" "}
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Max Class Size</Form.Label>
            <Form.Control
              required
              as="select"
              onChange={(e) => setMaxSize(e.target.value)}
            >
              {" "}
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
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Class Start Time</Form.Label>
            <Form.Control
              required
              as="select"
              onChange={(e) => setClassTime(e.target.value)}
            >
              <option>06:00:00</option>
              <option>07:00:00</option>
              <option>08:00:00</option>
              <option>09:00:00</option>
              <option>10:00:00</option>
              <option>11:00:00</option>
              <option>12:00:00</option>
              <option>13:00:00</option>
              <option>14:00:00</option>
              <option>15:00:00</option>
              <option>16:00:00</option>
              <option>17:00:00</option>
              <option>18:00:00</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <DevBtn styleClass="btn-red" onClick={handleSubmit}>
          Create Class
        </DevBtn>
      </Form>
    </Card>
  );
}

export default InfoBoxRightColumn;
