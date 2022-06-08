import React from "react";
import { Button, Card } from "react-bootstrap";

const SingleCart = (props) => {
  const { name, img, quantity, price, seller, stock, key } = props.product;
  const { handleClick } = props;
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>name:{name}</Card.Title>
          <Card.Text>quantity:{quantity}</Card.Text>
          <Card.Text>price:{price}</Card.Text>
          <Card.Text>seller:{seller}</Card.Text>
          <Card.Text>stock:{stock}</Card.Text>
          <Button variant="primary" onClick={() => handleClick(key)}>
            deleteItem
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleCart;
