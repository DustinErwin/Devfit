import React, { useState } from 'react';
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import jumpRope from "../../images/store/jumpRope.jpg";

function StoreItem(props) {
    const [ selectedQuantity, updateSelectedQuantity] = useState(0);
    const handleInputChange = (event) => {
        const {value} = event.target;
        const numValue = (Number(value) < 0) ? 0 : ((Number(value) > el.quantity) ? el.quantity: Number(value));
        updateSelectedQuantity(numValue);
    }
    const addToCartHandler = (event) => {
      event.preventDefault();
      clickHandler(el._id, selectedQuantity);
    }
    const {el, clickHandler} = props;
    return (
        <Card
        className="my-3 mx-3"
        border="danger"
        style={{ width: "18rem" }}
      >
        <Card.Img variant="top" src={jumpRope} />
        <Card.Body>
          <Card.Title>{el.name}</Card.Title>
          <Card.Text>{el.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>${el.price}</ListGroupItem>
          <ListGroupItem>Qty: {el.quantity - selectedQuantity}</ListGroupItem>
        </ListGroup>
        <Card.Body>
            <span>
            Enter Quantity: {' '}
            <input type="number" name="selectedQuantity" value={selectedQuantity} className="w-50" onChange={handleInputChange} min="0" max={el.quantity}/></span>
            <br/>
            <br/>
          <Card.Link href="#">
            <Button type="button" onClick={addToCartHandler}>Add To Cart</Button>
          </Card.Link>
        </Card.Body>
      </Card>

    );
}

export default StoreItem;