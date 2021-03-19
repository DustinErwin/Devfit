import React, { useContext, useState } from "react";
import Col from "react-bootstrap/Col";
import "./styles.css";
import UserContext from "../../../utilities/contexts/userContext";
import AuthenticationButton from "../../authenticationButton";
import convertTime from "../../../utilities/reusableFunctions/convertTime";
import DevBtn from "../../commonComponents/devButton/devButton";
import { Redirect } from "react-router";
import IsShoppingContext from "../../../utilities/contexts/isShoppingContext";

//TODO: Basic Framework Created. Still need to add Api Call and show classes signed up for.
function MemberInfoBox(props) {
  const user = useContext(UserContext);
  const { setIsShopping } = useContext(IsShoppingContext);
  const [sendShop, setSendShop] = useState();
  const classesJoined = props.classesJoined || [];
  const classAmount = classesJoined.length;

  return (
    <Col className=" ">
      <h2 className="mt-4 mb-4">Hi, {user.firstName}</h2>
      <p>
        You are signed up for
        <span className="number-of-classes-taken">
          <b></b>
        </span>{" "}
        <span className="sentence-text-classes">{classAmount}</span>{" "}
        {classAmount === 1 ? "class " : "classes "}
        this week.
      </p>
      <div className="classes-taken">
        {classesJoined.map((unit) => {
          return (
            <p key={unit.id}>
              {unit.class_name} at {convertTime(unit.start_time)} on {unit.day}
            </p>
          );
        })}
      </div>
      <AuthenticationButton />
      {sendShop ? sendShop : null}{" "}
      <DevBtn
        styleClass="btn-dark ml-3"
        onClick={() => {
          setIsShopping(true);
          setSendShop(<Redirect to={`/member-store`} />);
        }}
      >
        Member Store
      </DevBtn>
    </Col>
  );
}

export default MemberInfoBox;
