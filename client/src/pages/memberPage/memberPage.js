import React, {useEffect} from "react";
import Header from "../../components/commonComponents/header/header";
import Footer from "../../components/commonComponents/footer/footer";
import MemberInfoBox from "../../components/memberPageComponents/memberInfoBox/memberInfoBox";
import MeetYourTrainerBox from "../../components/memberPageComponents/meetYourTrainerBox/TrainerCarousel";
import Row from "react-bootstrap/Row";
import AuthenticationButton from "../../components/authenticationButton";
import Container from "react-bootstrap/Container";
import UserInfoBox from "../../components/commonComponents/userInfoBox/userInfoBox";
import RightColumn from "../../components/employeePageComponents/userInfoBoxColumns/InfoBoxRightColumn";
import LeftColumn from "../../components/employeePageComponents/userInfoBoxColumns/infoBoxLeftColumn";

function MemberPage() {
  function fetchScheduleData() {
    fetch("/api/classes/6047aab647549b4658f9e12e", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    //on page load, fetch the schedule data
    fetchScheduleData();
  }, []);

  return (
    <>
      <Header />
      {/* <UserInfoBox
        colLeft={
          <LeftColumn
            // firstName={}
            // numClassesTaught={}
            // userClasses={}
            // handleRoster={}
          />
        }
        // colRight={<RightColumn rosterList={classRoster || []} />}
      ></UserInfoBox> */}

      <Footer />
    </>
  );
}

export default MemberPage;
