import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import useCart from "../../CustomHooks/useCart";
import { addToDb } from "../fakedb/data";
import Product from "../Product/Product";
import "./Shop.css";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [display, setDisplay] = useState([]);
  const [countPage, setCountPage] = useState(0);
  const [page, setPage] = useState(0);
  const size = 10;
  useEffect(() => {
    fetch(`http://localhost:5000/products?page=${page}&&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setDisplay(data.products);
        const count = data.count;
        const countPages = Math.ceil(count / size);
        setCountPage(countPages);
      });
  }, [page]);
  const handleClick = (product) => {
    const exists = cart.find((pro) => pro.key === product.key);
    let newCart = [];
    if (exists) {
      const rest = cart.filter((pro) => pro.key !== product.key);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDb(product.key);
  };
  const handleOnSearch = (e) => {
    const search = e.target.value;
    const matchProducts = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setDisplay(matchProducts);
  };
  return (
    <div>
      <Container>
        <Row>
          <input
            className="w-50 mx-auto my-5"
            type="text"
            placeholder="type your product"
            onChange={handleOnSearch}
          />
          <Col lg={10}>
            <div className="d-flex flex-wrap gap-4">
              {display.map((product) => (
                <Product
                  key={product.key}
                  product={product}
                  handleClick={handleClick}
                ></Product>
              ))}
            </div>
            {/* pagination */}
            <div className="row mt-5">
              <div className="col ">
                <div className="w-50 mx-auto pagination">
                  {[...Array(countPage).keys()].map((number) => (
                    <Button
                      className={number === page ? "selected" : ""}
                      key={number}
                      onClick={() => setPage(number)}
                    >
                      {number + 1}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            ;
          </Col>

          <Col lg={2}>
            <Cart cart={cart}>
              <Link to="/order-review">
                <Button>Order product</Button>
              </Link>
            </Cart>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Shop;
