import React from "react";
import Form from "react-bootstrap/Form";

export default function textInput(props) {
  return <Form.Control type="text" placeholder={props.placeholder} />;
}
