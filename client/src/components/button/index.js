import React from "react";
import "./styles.css";
import { Button as BootstrapButton } from "react-bootstrap";

/* Takes three Props 
1. styleClass: use btn-red or btn-dark. You can also add new css classes, but do not alter the current ones. 
2. text: The text the button displays
3. handleClick: attatch to any btnClick event*/


function Button(props) {
  return (
    <BootstrapButton
      className={
        "button align-self-center " + props.styleClass
      }
      onClick={props.handleClick}
    >
      {props.text}
    </BootstrapButton>
  );
}

export default Button;
