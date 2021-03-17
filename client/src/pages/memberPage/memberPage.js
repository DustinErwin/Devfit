import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import MemberInfoBox from "../../components/memberPageComponents/memberInfoBox/memberInfoBox";
import MeetYourTrainerBox from "../../components/memberPageComponents/meetYourTrainerBox/TrainerCarousel";
import MemberSchedule from "../../components/memberPageComponents/memberSchedule/memberSchedule";
import UserContext from "../../utilities/userContext";
import DevBtn from "../../components/commonComponents/devButton/devButton";
import IsShoppingContext from "../../utilities/isShoppingContext";
import { Redirect } from "react-router";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox";
import {
  addMemberToClass,
  getScheduleData,
  memberJoinedClasses,
  removeMemberFromClass,
} from "../../utilities/memberAPI/memberAPI";
import { renderSchedule } from "../../utilities/renderSchedule";

function MemberPage() {
  const { setIsShopping } = useContext(IsShoppingContext);
  const [sendShop, setSendShop] = useState();
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

  useEffect(() => {
    fecthJoinedClasses();
    fetchScheduleData();
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      <Header />
      <DevBtn
        styleClass="btn-red mb-3"
        onClick={() => {
          setIsShopping(true);
          setSendShop(<Redirect to={`/member-store`} />);
        }}
      >
        Member Store
      </DevBtn>
      {sendShop ? sendShop : null}
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
