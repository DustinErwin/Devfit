import React from "react";
import Card from "react-bootstrap/Card";
import "./styles.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

function InfoBoxRightColumn(props) {
  console.log(props);

  return props.displayAddClass === false ? (
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
    <Card className="add-class mb-5 mt-5">
      {" "}
      <Card.Header>Add Class</Card.Header>
      <Row>
        <Col className="col-6">
          <Form.Group>
            <p>Class Name</p>
            <Form.Control type="text" placeholder="Class Name" />
            <br />
            <p>WeekDay</p>
            <Form.Control as="select">
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
            <Form.Control as="select">
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
            <Form.Control as="select">
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
            <br />
          </Form.Group>
        </Col>
      </Row>
    </Card>
  );
}

export default InfoBoxRightColumn;
