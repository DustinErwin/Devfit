import React from "react";
import ScheduleColumn from "../../commonComponents/scheduleColumn/scheduleColumn";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import DevBtn from "../../commonComponents/devButton/devButton";
import Col from "react-bootstrap/Col";
import convertTime from "../../../utilities/convertTime";
import "./styles.css";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function ManagerSchedule(props) {

  return (
    <>
      <Container fluid className="mt-md-5 mb-md-5 larger-font">
        <Row className="white-background ml-md-5 mr-md-5">
          {props.classSchedule.map((day) => {
            return (
              <ScheduleColumn
                dayOfWeek={day.weekDay}
                todaysDate={day.date}
                key={day.date}
              >
                {day.classData.map((singleClass, i) => {
                  //convert time stamp into readable time
                  const convertedTime = convertTime(singleClass.start_time);

                  return (
                    <Container key={i} className="p-0">
                      <Row className="m-0 pb-3 pt-3 border-to-bottom-thin ">
                        <Col
                          xs={12}
                          className="  border-teal pb-3 text-center border-to-right"
                        >
                          <h4 className=" bold text-red">
                            {singleClass.class_name}{" "}
                          </h4>
                          <div>{convertedTime} </div>
                          <div>{singleClass.trainer_name}</div>
                          <div>
                            slots left{" "}
                            {singleClass.max_size - singleClass.current_size}
                          </div>
                        </Col>

                        <Col
                          xs={12}
                          className=" border-teal center-btn border-to-right"
                        >
                          <DevBtn
                            onClick={(e) => props.handleRosterClick(e)}
                            styleClass="btn-red"
                            id={singleClass.id}
                          >
                            Roster
                          </DevBtn>
                        </Col>
                      </Row>
                    </Container>
                  );
                })}
              </ScheduleColumn>
            );
          })}
        </Row>
      </Container>
      <Container>
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Roster</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.classRoster.map((item, i) => {
              return (
                <Row>
                  <Col key={i} className="roster-item mb-3">
                    {" "}
                    <span role="img" aria-label="Boxing Glove">
                      🥊
                    </span>{" "}
                    {item[0]}
                  </Col>
                  <Col>
                    {" "}
                    <DevBtn
                      styleClass="btn-red roster-btn "
                      onClick={(e) => props.removeMember(e)}
                      id={item[1]}
                    >
                      Remove
                    </DevBtn>{" "}
                  </Col>
                </Row>
              );
            })}
            <Row>
              <Col xs={8}>
                <InputGroup className="mb-3">
                  <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e) => props.setSelectedMember(e.target.value)}
                    list="memberList"
                  ></FormControl>
                  <datalist id="memberList">
                    {props.allMembers.map((item) => {
                      return <option>{item.fullName}</option>;
                    })}
                  </datalist>
                </InputGroup>
              </Col>
              <Col>
                <DevBtn styleClass="btn-red" onClick={props.addMemberToClass}>
                  Add Member
                </DevBtn>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <DevBtn styleClass="btn-red" onClick={props.handleClose}>
              Close
            </DevBtn>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default ManagerSchedule;
