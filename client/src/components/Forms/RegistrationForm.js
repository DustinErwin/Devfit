import React from "react";
import Form from "react-bootstrap/Form";
import TextInput from "./TextInput";
import FormLabel from "./FormLabel";
import DropdownInput from "./DropdownInput";

export default function RegistrationForm() {
  // let searchList = ["Apple", "Banana", "Strawberry"];
  // const handleClick = () => {
  //   console.log("clicked");
  // };
  return (
    <Form>
      <Form.Group controlId="exampleForm.ControlInput1">
        <FormLabel message="abc"></FormLabel>
        <TextInput placeholder="text"></TextInput>
        {/* <DropdownInput
          options={searchList}
          menuClassName="dropdown-input"
          onSelect={handleClick}
          placeholder="Select..."
        ></DropdownInput> */}
      </Form.Group>
    </Form>
  );
}
