import React from "react";
import ScheduleClass from "../../commonComponents/scheduleClass/scheduleClass";
import ScheduleColumn from "../../commonComponents/scheduleColumn/scheduleColumn";
import { Row, Container } from "react-bootstrap/";
import convertTime from "../../../utilities/convertTime";

function MemberSchedule(props) {
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
                return (
                  <ScheduleClass
                    fitClassName={singleClass.class_name}
                    classTime={convertTime(singleClass.start_time)}
                    classTrainer={singleClass.trainer_name}
                    spotsLeft={singleClass.max_size - singleClass.current_size}
                    key={singleClass.id}
                  ></ScheduleClass>
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
