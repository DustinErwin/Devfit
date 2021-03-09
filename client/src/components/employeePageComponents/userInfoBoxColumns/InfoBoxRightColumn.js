import React from 'react'
import Card from "react-bootstrap/Card"
import './styles.css'

function InfoBoxRightColumn() {
return(<Card className="right-column mb-5 mt-5">
<Card.Body>
  <Card.Title>Roster</Card.Title>
  <Card.Text>
    Some quick example text to build on the card title and make up
    the bulk of the card's content.
  </Card.Text>
</Card.Body>
</Card>)
}

export default InfoBoxRightColumn