import React from "react";
import "./styles.css";
import { Button as BootstrapButton } from "react-bootstrap";

/* Takes three Props 
1. styleClass: use btn-red or btn-dark. You can also add new css classes, but do not alter the current ones. 
2. handleClick: attatch to any btnClick event
3. props.children allows us to enter text between tags as normal when making buttons*/

function DevBtn(props) {
  return (
    <BootstrapButton
      className={"button align-self-center " + props.styleClass } id={props.id}
      onClick={props.onClick} disabled={props.disableBtn}
    >
      {props.children}
    </BootstrapButton>
  );
}

export default DevBtn;
