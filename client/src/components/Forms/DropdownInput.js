import React from "react";

export default function DropdownInput(props) {
  return (
    <DropdownInput
      options={props.searchList}
      defaultValue={props.initialValue}
      menuClassName="dropdown-input"
      onSelect={props.onSelect}
      placeholder="Select..."
    />
  );
}
