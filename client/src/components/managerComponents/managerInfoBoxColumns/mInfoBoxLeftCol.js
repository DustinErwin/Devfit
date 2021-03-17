import React from "react";
import DevBtn from "../../commonComponents/devButton/devButton";
import "./styles.css";
import AuthenticationButton from "../../authenticationButton/logoutButton/logoutButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function InfoBoxLeftColumn(props) {
  return (
    <>
      <Row>
        <Col xs="12" className="mb-4 mt-4">
          <h3>Trainers</h3>
        </Col>
        {props.allTrainers.map((item, i) => {
          return (
            <>
              <Col xs="5" key={i} className="view-col mb-3">
                {" "}
                <DevBtn
                  id={item._id}
                  styleClass="btn-dark mr-4"
                  onClick={(e) => props.trainerSelect(e)}
                >
                  View
                </DevBtn>{" "}
              </Col>

              <Col xs="7" className="trainer-col">
                {`${item.first_name}  ${item.last_name}`}{" "}
              </Col>
            </>
          );
        })}
      </Row>
      <Row className="mt-3 flex justify-content-center">
        <DevBtn styleClass="btn-dark mr-3" onClick={props.toggleAddTrainer}>
          Add Trainer
        </DevBtn>{" "}
        <AuthenticationButton />
      </Row>
    </>
  );
}

export default InfoBoxLeftColumn;
