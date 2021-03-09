import React from 'react'
import Card from "react-bootstrap/Card"
import './styles.css'

function InfoBoxRightColumn(props) {
return(<Card className="right-column mb-5 mt-5">
<Card.Body>
  <Card.Title>Roster</Card.Title>
  <Card.Text>
{/* receives an array of members as a prop and renders them as card text */}
    {props.rosterList.map((item) => <li key={item}>{item}</li> )}
  </Card.Text>
</Card.Body>
</Card>)
}

export default InfoBoxRightColumn