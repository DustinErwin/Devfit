import React from "react";
import ScheduleClass from "../../commonComponents/scheduleClass/scheduleClass";
import ScheduleColumn from "../../commonComponents/scheduleColumn/scheduleColumn";
import { Row, Container } from "react-bootstrap/";
import convertTime from "../../../utilities/convertTime";
import DevBtn from "../../commonComponents/devButton/devButton";

function MemberSchedule(props) {
  const classesJoined = props.classesJoined || [];
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
                    spotsLeft={singleClass.max_size - singleClass.current_size}
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
    </Container>
  );
}

export default MemberSchedule;
