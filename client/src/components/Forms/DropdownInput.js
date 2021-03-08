import React from "react";

export default function DropdownInput(props) {
  let searchList = [];

  return (
    <DropdownInput
      options={searchList}
      menuClassName="dropdown-input"
      onSelect={props.onSelect}
      placeholder="Select..."
    />
  );
}
