import React from "react";
import Container from "react-bootstrap/Container";

/*
- All groups of content can be wrapped with this empty container. 
- It is ready to accept columns and rows.  
- styleClass prop can be used to add classes for bootstrap styling
- props.children lets us pass in other info
*/

function ContentWrapper(props) {
  return (
    <Container className={"button align-self-center " + props.styleClass}>
      {props.children}
    </Container>
  );
}

export default ContentWrapper;
