import React from "react";
import ScheduleColumn from "../../commonComponents/scheduleColumn/scheduleColumn";
import { Row, Container } from "react-bootstrap/";
import DevBtn from "../../commonComponents/devButton/devButton";
import Col from "react-bootstrap/Col";
import convertTime from "../../../utilities/convertTime";
import "./styles.css";

function EmployeeSchedule(props) {
  const userData = props.userData;

  //when delete btns are clicked, send a delete request, then fetchSchedule classSchedule, re-rendering page.
  function handleDelete(event) {
    const id = event.target.id;
    fetch("/api/employee/removeClass/" + id, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => {
        //update schedule
        props.fetchScheduleData();
        //update left column with what classes trainer is teacahing
        props.fetchTrainerData();
      });
  }

  return (
    <Container fluid>
      <Row>
        {props.classSchedule.map((day) => {
          return (
            <ScheduleColumn
              dayOfWeek={day.weekDay}
              todaysDate={day.date}
              key={day.date}
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
                    className="m-0 pb-3 pt-3 border-to-bottom-thin scheduleClass border-to-right"
                  >
                    <Col className=" col-12 border-teal pb-3 text-center ">
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

                    <Col className=" col-12 border-teal center-btn">
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
    </Container>
  );
}

export default EmployeeSchedule;
