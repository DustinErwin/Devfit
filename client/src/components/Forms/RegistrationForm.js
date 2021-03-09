import React from "react";
import Form from "react-bootstrap/Form";
import TextInput from "./TextInput";
import FormLabel from "./FormLabel";

export default function RegistrationForm() {
  return (
    <Form>
      <Form.Group controlId="exampleForm.ControlInput1">
        <FormLabel message="abc"></FormLabel>
        <TextInput placeholder="text"></TextInput>
      </Form.Group>
    </Form>
  );
}
