import React from "react";
import ScheduleColumn from "../../commonComponents/scheduleColumn/scheduleColumn";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import DevBtn from "../../commonComponents/devButton/devButton";
import Col from "react-bootstrap/Col";
import convertTime from "../../../utilities/convertTime";



function managerSchedule(props) {

  //declaring class schedule as an empty array avoids an error where the array doesn't exist yet.
  const classSchedule = props.classSchedule || [];
  return (
    <Container fluid className="mt-md-5 mb-md-5">
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
                    <Container>
                  <Row
                    key={i}
                    className="m-0 pb-3 pt-3 border-to-bottom-thin "
                  >
                    <Col xs={12} className="  border-teal pb-3 text-center border-to-right">
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

                    <Col xs={12} className=" border-teal center-btn border-to-right">
                      <DevBtn onClick={props.fetchClassRoster} styleClass="btn-red" id={singleClass.id}>
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
  );
}

export default managerSchedule;
