import React, { useState, useEffect } from "react";
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
import MobileSchedule from "../../commonComponents/mobileSchedule/mobileSchedule";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";

function ManagerSchedule(props) {
  //declaring class schedule as an empty array avoids an error where the array doesn't exist yet.
  const classSchedule = props.classSchedule;
  const [mobile, setMobile] = useState(true);
  const [mobileDay, setMobileDay] = useState(0);

//The width where the schedule starts looking bad, so we switch to mobile schedule
  const mobileWidth = window.matchMedia("(max-width: 1200px)");

  //from https://joshwcomeau.com/react/the-perils-of-rehydration/
  
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
  }

  //set a variable to window Resize
  const windowSizeChanges = useWindowSize();

  //Every time the window resizes, check if it should switch to mobile
  useEffect(() => {
    if (mobileWidth.matches) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSizeChanges]);

  return (
    <>
      <Container fluid className="mt-md-5 mb-md-5 larger-font">
        {mobile ? (
          <>
            {classSchedule[0] && (
              <>
                <Row className="">
                  <Col className=" larger-font pl-0 pr-0">
                    <Navbar bg="light" className="p-0 mr-0 ml-0 ">
                      <Nav className=" mobile-dropdown">
                        <NavDropdown
                          title="Weekday"
                          id="basic-nav-dropdown"
                          className="weekday-heading"
                        >
                          {[0, 1, 2, 3, 4, 5, 6].map((item, i) => {
                            return (
                              <div key={i}>
                                <NavDropdown.Item
                                  key={i}
                                  onClick={(e) => setMobileDay(e.target.id)}
                                  className="text-center full-width weekday-body"
                                >
                                  <h2 id={i} key={i}>
                                    {classSchedule[i].weekDay}
                                  </h2>
                                </NavDropdown.Item>
                                <Dropdown.Divider />
                              </div>
                            );
                          })}
                        </NavDropdown>
                      </Nav>
                    </Navbar>
                  </Col>
                </Row>
                <Row className="white-background ml-md-5 mr-md-5">
                  <MobileSchedule
                    dayOfWeek={classSchedule[mobileDay].weekDay}
                    todaysDate={classSchedule[mobileDay].date}
                  >
                    {classSchedule[mobileDay].classData.map(
                      (singleClass, i) => {
                        const convertedMobileTime = convertTime(
                          singleClass.start_time
                        );
                        return (
                          <Container key={i}>
                            <Row className="m-0 pb-3 pt-3 border-to-bottom-thin ">
                              <Col
                                xs={12}
                                className="  border-teal pb-3 text-center "
                              >
                                <h4 className=" bold text-red">
                                  {singleClass.class_name}{" "}
                                </h4>
                                <div>{convertedMobileTime} </div>
                                <div>{singleClass.trainer_name}</div>
                                <div>
                                  slots left{" "}
                                  {singleClass.max_size -
                                    singleClass.current_size}
                                </div>
                              </Col>

                              <Col xs={12} className=" border-teal center-btn ">
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
                      }
                    )}
                  </MobileSchedule>
                </Row>
              </>
            )}
          </>
        ) : (
          <Row className="white-background ml-md-5 mr-md-5">
            {classSchedule.map((day) => {
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
                      <Container key={i}>
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
        )}
      </Container>
      <Container>
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Roster</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.classRoster.map((item, i) => {
              return (
                <Row key={i}>
                  <Col className="roster-item mb-3">
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
                    {props.allMembers.map((item, i) => {
                      return <option key={i}>{item.fullName}</option>;
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
