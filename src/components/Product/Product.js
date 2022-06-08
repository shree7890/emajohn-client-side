import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "react-rating";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStarHalfStroke,
  faStarOfDavid,
} from "@fortawesome/free-solid-svg-icons";
const Product = (props) => {
  const { category, img, name, price, seller, star } = props.product;
  const { handleClick } = props;
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{category}</Card.Title>
          <Card.Text>{name}</Card.Text>
          <Card.Text>{price}</Card.Text>
          <Card.Text>{seller}</Card.Text>
          <Card.Text>
            <span>
              <Rating
                initialRating={star}
                readonly
                emptySymbol={<FontAwesomeIcon icon={faStarHalfStroke} />}
                fullSymbol={<FontAwesomeIcon icon={faStarOfDavid} />}
              />
              <span>{star}</span>
            </span>
          </Card.Text>
          <Button variant="primary" onClick={() => handleClick(props.product)}>
            add to cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
