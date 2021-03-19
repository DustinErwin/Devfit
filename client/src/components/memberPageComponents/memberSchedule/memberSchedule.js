import React, { useState, useEffect } from "react";
import ScheduleClass from "../../commonComponents/scheduleClass/scheduleClass";
import ScheduleColumn from "../../commonComponents/scheduleColumn/scheduleColumn";
import { Row, Container, Col } from "react-bootstrap/";
import convertTime from "../../../utilities/reusableFunctions/convertTime";
import DevBtn from "../../commonComponents/devButton/devButton";
import "./memberSchedule.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import MobileSchedule from "../../commonComponents/mobileSchedule/mobileSchedule";
import CheckWindowSize from "../../../utilities/reusableFunctions/checkWindowSize";

function MemberSchedule(props) {
  const classesJoined = props.classesJoined || [];
  const classSchedule = props.classSchedule;

  //tracks whether mobile view schedule or desktop
  const [mobile, setMobile] = useState(true);
  //tracks which day user is viewing in mobile schedule
  const [mobileDay, setMobileDay] = useState(0);

  //The width where the schedule starts looking bad, so we switch to mobile schedule
  const mobileWidth = window.matchMedia("(max-width: 1200px)");

  //set a variable to window Resize
  const windowSizeChanges = CheckWindowSize();

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
                  {classSchedule[mobileDay].classData.map((singleClass, i) => {
                    const convertedMobileTime = convertTime(
                      singleClass.start_time
                    );
                    let isJoined =
                      classesJoined.filter(
                        (unit) => unit.id === JSON.stringify(singleClass.id)
                      ).length > 0;
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
                              {singleClass.max_size - singleClass.current_size}
                            </div>
                          </Col>

                          <Col xs={12} className=" border-teal center-btn ">
                            {isJoined ? (
                              <DevBtn
                                id={singleClass.id}
                                styleClass="btn-red"
                                onClick={() => props.leaveClass(singleClass.id)}
                              >
                                Unenroll
                              </DevBtn>
                            ) : (
                              <DevBtn
                                id={singleClass.id}
                                styleClass="btn-red"
                                onClick={() => props.joinClass(singleClass.id)}
                              >
                                Enroll
                              </DevBtn>
                            )}
                          </Col>
                        </Row>
                      </Container>
                    );
                  })}
                </MobileSchedule>
              </Row>
            </>
          )}
        </>
      ) : (
        <Row className="white-background ml-md-5 mr-md-5">
          {props.classSchedule.map((day) => {
            return (
              <ScheduleColumn
                dayOfWeek={day.weekDay}
                todaysDate={day.date}
                key={day.date}
              >
                {day.classData.map((singleClass) => {
                  let isJoined =
                    classesJoined.filter(
                      (unit) => unit.id === JSON.stringify(singleClass.id)
                    ).length > 0;
                  return (
                    <ScheduleClass
                      fitClassName={singleClass.class_name}
                      classTime={convertTime(singleClass.start_time)}
                      classTrainer={singleClass.trainer_name}
                      spotsLeft={
                        singleClass.max_size - singleClass.current_size
                      }
                      key={singleClass.id}
                    >
                      {isJoined ? (
                        <DevBtn
                          id={singleClass.id}
                          styleClass="btn-red"
                          onClick={() => props.leaveClass(singleClass.id)}
                        >
                          Unenroll
                        </DevBtn>
                      ) : (
                        <DevBtn
                          id={singleClass.id}
                          styleClass="btn-red"
                          onClick={() => props.joinClass(singleClass.id)}
                        >
                          Enroll
                        </DevBtn>
                      )}
                    </ScheduleClass>
                  );
                })}
              </ScheduleColumn>
            );
          })}
        </Row>
      )}
    </Container>
  );
}

export default MemberSchedule;
