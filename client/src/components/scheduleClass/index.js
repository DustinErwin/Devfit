import React from 'react'
import DevBtn from '../button'
import './styles.css'

function ScheduleClass(props) {

return  <div className="row m-0 pb-3 pt-3 border-to-bottom-thin font-large">
<div className="col border-teal pb-3 text-center">
  <h4 className=" bold text-red">className</h4>
  <div className="class-time-${fitClass.day}">Time</div>
  <div className="class-trainer-${fitClass.day}" >Trainer</div>
  <div className="class-spots-left-${fitClass.day}"> slots left</div>
</div>
<div className="col border-to-right border-teal d-flex">
<DevBtn >Join</DevBtn>
</div>
</div>
}

export default ScheduleClass