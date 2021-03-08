import React from "react";
import Form from "react-bootstrap/Form";

export default function FormLabel(props) {
  return <Form.Label>{props.message}</Form.Label>;
}
