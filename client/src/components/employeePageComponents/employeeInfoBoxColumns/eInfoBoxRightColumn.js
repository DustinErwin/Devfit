import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "./styles.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import DevBtn from "../../commonComponents/devButton/devButton";
import { employeeAddClass } from "../../../utilities/employeeAPI/employeeAPI";

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

    employeeAddClass(classData).then(() => {
      props.fetchScheduleData();
      props.fetchTrainerData();
    });
  }

  //Bootstrap validation

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      event.preventDefault()
      setValidated(true);
      return false
   
    }
    // event.stopPropagation()
    event.preventDefault();
    handleClassCreation();
    setValidated(false);
  };
  const rosterList = props.rosterList || [];
  //Ternery using toggleAddClass state in parent. Change Value in state to change right Col
  return props.displayAddClass === "roster" ? (
    <Card className=" mb-3 mt-4 right-col-card">
      <Card.Title className=" add-class-title text-center mt-4">
        <h3>Roster</h3>
      </Card.Title>
      <Card.Body>
        <Form className="white-background rounded p-3">
          <Card.Text>
            {rosterList[0] === undefined ? (
              <p className="text-center">No one signed up yet!</p>
            ) : (
              props.rosterList.map((item, i) => (
                <li className="list-item" key={item}>
                  {i + 1}. {item[0]}{" "}
                </li>
              ))
            )}
          </Card.Text>
        </Form>
      </Card.Body>
    </Card>
  ) : (
    <Card className="right-col-card mb-3 mt-3 pb-3 pt-3">
      <Card.Title className=" add-class-title text-center mt-3 mb-4">
        <h3>Add Class</h3>
      </Card.Title>
      <Form
        noValidate
        validated={validated}
        className="white-background rounded p-3 ml-3 mr-3"
        onSubmit={handleSubmit}
      >
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
          <Form.Group as={Col} md="6" controlId="validationCustom03">
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
          <Form.Group as={Col} md="6" controlId="validationCustom04">
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
        <div className="d-flex justify-content-center mt-3">
          <DevBtn styleType="submit" styleClass="btn-dark">
            Create Class
          </DevBtn>
        </div>
      </Form>
    </Card>
  );
}

export default InfoBoxRightColumn;
