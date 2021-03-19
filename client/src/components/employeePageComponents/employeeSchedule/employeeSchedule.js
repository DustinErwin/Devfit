import React, { useState, useEffect } from "react";
import ScheduleColumn from "../../commonComponents/scheduleColumn/scheduleColumn";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import DevBtn from "../../commonComponents/devButton/devButton";
import Col from "react-bootstrap/Col";
import convertTime from "../../../utilities/convertTime";
import "./styles.css";
import { employeeRemoveClass } from "../../../utilities/employeeAPI/employeeAPI";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import MobileSchedule from "../../commonComponents/mobileSchedule/mobileSchedule";
import CheckWindowSize from "../../../utilities/checkWindowSize"

function EmployeeSchedule(props) {
  const userData = props.userData;
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

  //when delete btns are clicked, send a delete request, then fetchSchedule classSchedule, re-rendering page.
  function handleDelete(event) {
    const id = event.target.id;
    employeeRemoveClass(id).then(() => {
      //update schedule
      props.fetchScheduleData();
      //update left column with what classes trainer is teacahing
      props.fetchTrainerData();
    });
  }

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
                          styleClass="btn-red "
                          onClick={handleDelete}
                          id={singleClass.id}
                        >
                          Delete{" "}
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
        {props.classSchedule.map((day) => {
          return (
            <ScheduleColumn
              dayOfWeek={day.weekDay}
              todaysDate={day.date}
              key={day.date}
              styleName="pb-5 pt-5"
            >
              {day.classData.map((singleClass, i) => {
                // Render Logic for button. If employee teaches class, then a delete btn appears to delete class
                let employeesClass;

                userData.firstName === singleClass.trainer_name
                  ? (employeesClass = true)
                  : (employeesClass = false);

                //convert time stamp into readable time
                const convertedTime = convertTime(singleClass.start_time);

                return (
                  <Row
                    key={i}
                    className="m-0 pb-3 pt-3 border-to-bottom-thin scheduleClass "
                  >
                    <Col
                      xs={12}
                      className="border-teal pb-3 text-center border-to-right"
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
                      className="border-teal center-btn border-to-right "
                    >
                      {employeesClass && (
                        <DevBtn
                          styleClass="btn-red "
                          onClick={handleDelete}
                          id={singleClass.id}
                        >
                          Delete{" "}
                        </DevBtn>
                      )}
                    </Col>
                  </Row>
                );
              })}
            </ScheduleColumn>
          );
        })}
      </Row>
        )}
    </Container>
    </>
  );
}

export default EmployeeSchedule;
