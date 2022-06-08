import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useCart from "../../CustomHooks/useCart";
import Cart from "../Cart/Cart";
import { deleteFromDb } from "../fakedb/data";
import SingleCart from "../SingleCart/SingleCart";

const Order = () => {
  const [cart, setCart] = useCart();
  const handleClick = (key) => {
    const newCart = cart.filter((product) => product.key !== key);
    setCart(newCart);
    deleteFromDb(key);
  };
  const navigate = useNavigate();
  const handlePlaceOrder = () => {
    navigate("/shipping");
  };
  return (
    <div>
      <Container>
        <Row>
          <Col className="d-flex flex-wrap gap-4" lg={10}>
            {cart.map((product) => (
              <SingleCart
                key={product.key}
                product={product}
                handleClick={handleClick}
              ></SingleCart>
            ))}
          </Col>
          <Col lg={2}>
            <Cart cart={cart}>
              <Button onClick={handlePlaceOrder}>Procced to shipping</Button>
            </Cart>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Order;
