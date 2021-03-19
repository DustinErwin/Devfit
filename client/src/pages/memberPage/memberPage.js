import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import MemberInfoBox from "../../components/memberPageComponents/memberInfoBox/memberInfoBox";
import MeetYourTrainerBox from "../../components/memberPageComponents/meetYourTrainerBox/TrainerCarousel";
import MemberSchedule from "../../components/memberPageComponents/memberSchedule/memberSchedule";
import UserContext from "../../utilities/contexts/userContext";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox";

import {
  addMemberToClass,
  getScheduleData,
  memberJoinedClasses,
  removeMemberFromClass,
} from "../../utilities/memberAPI/memberAPI";
import { renderSchedule } from "../../utilities/reusableFunctions/renderSchedule";

function MemberPage() {
  const user = useContext(UserContext);
  const [userClasses, setUserClasses] = useState([]); //The classes the member is enrolled in the left column info box
  const [classSchedule, setClassSchedule] = useState([]); //all info for each class rendered in schedule

  //fetches all the information needed to render a schedule and stores it in state.
  function fetchScheduleData() {
    getScheduleData().then((res) => {
      const weekArray = renderSchedule(res);

      setClassSchedule(weekArray);
    });
  }

   //whenver the class Roster updates, update schedule to reflect spots left change
   useEffect(() => {
    fetchScheduleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userClasses]);

  useEffect(() => {
    fecthJoinedClasses();
    fetchScheduleData();
    // eslint-disable-next-line
  }, [user]);


  function removeFromClass(classid) {
    let data = { id: classid, memberid: user._id };
    removeMemberFromClass(data).then(() => {
      fecthJoinedClasses();
    });
  }

  function addToClass(classid) {
    let data = { id: classid, memberid: user._id };
    addMemberToClass(data).then(() => {
      fecthJoinedClasses();
    });
  }

  function fecthJoinedClasses() {
    memberJoinedClasses(user._id).then((classesJoined) => {
      setUserClasses([...classesJoined]);
    });
  }



  return (
    <>
      <Header />
      <UserInfoBox
        colLeft={<MemberInfoBox classesJoined={userClasses} />}
        colRight={<MeetYourTrainerBox />}
      ></UserInfoBox>
      <MemberSchedule
        classesJoined={userClasses}
        classSchedule={classSchedule}
        fetchScheduleData={() => fetchScheduleData()}
        joinClass={(e) => addToClass(e)}
        leaveClass={(e) => removeFromClass(e)}
      />
      <Footer />
    </>
  );
}

export default MemberPage;
