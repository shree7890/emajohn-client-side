import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./Header.css";
import logo from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";

const Header = () => {
  const { currentUser, logout, setCurrentUser } = useAuth();
  const [error, setError] = useState("");
  const handleLogOut = () => {
    logout()
      .then(() => {
        setError("");
        setCurrentUser({});
        alert("Are you sure logout");
      })
      .catch(() => {
        setError("log out failed");
      });
  };
  const element = <FontAwesomeIcon icon={faCartShopping} />;
  return (
    <>
      <Navbar bg="light" className="py-3" variant="light">
        <Container>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <Nav className="me-auto menu">
            <NavLink to="/">Shop</NavLink>
            <NavLink to="/order-review">Order review</NavLink>
            <NavLink to="/inventory">Manage Inventory</NavLink>
            <span className="user">{currentUser.displayName}</span>
            {currentUser.displayName ? (
              <button onClick={handleLogOut}>Log Out</button>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
            {error && <span className="error">{error}</span>}
          </Nav>
          <div className="cart">
            <span className="element">
              {element} <span className="number">0</span>
            </span>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
