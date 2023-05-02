import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Navbar, Nav, Button, Badge, Dropdown } from "react-bootstrap";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { About } from "../pages/About";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Signup } from "../pages/Signup";
import { Products } from "../pages/Products";
import { Product } from "../pages/Collections/Product";
import ItemDescription from "../pages/ItemDescription";
import Cart from "../pages/Cart";
import CheckoutPage from "../pages/Checkout";
import { Footer } from "./Footer";
import { MapPage } from "../pages/MapPage";
import { Shipping } from "../pages/Shipping";

const NavbarComp = ({ userData, setUserData, cart, setCart }) => {
  const handleSignOut = () => {
    window.location.reload();
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar
          bg="dark"
          variant={"dark"}
          expand="lg"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 2,
            marginBottom: "20px",
          }}
        >
          <Container fluid>
            <Navbar.Brand as={Link} to={"/home"}>
              OfficeDepot
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav>
                <Nav.Link as={Link} to={"/about"}>
                  About
                </Nav.Link>
                <Nav.Link as={Link} to={"/products"}>
                  Products
                </Nav.Link>
                <Nav.Link as={Link} to={"/cart"}>
                  View Cart{" "}
                  <Badge bg="secondary" text="light" className="badge-circle">
                    {cart &&
                      cart.reduce((sum, currentItem) => {
                        return sum + currentItem.quantity;
                      }, 0)}
                  </Badge>
                </Nav.Link>
                {userData.cart_id ? (
                  <Nav.Link as={Link} to={"/profile"}>
                    Profile
                  </Nav.Link>
                ) : null}
                {userData.cart_id ? (
                  // <Navbar.Text>Hi {userData.name}!</Navbar.Text>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      Hi {userData.name}!
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleSignOut}>
                        Sign Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Button
                    className="ms-2"
                    variant="outline-primary"
                    as={Link}
                    to={"/signup"}
                  >
                    Sign Up/Login
                  </Button>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace={true} />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/shipping" element={<Shipping userData={userData} />} 
            
            />
            <Route
              path="/cart"
              element={
                <Cart cart={cart} setCart={setCart} userData={userData} />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile userData={userData} setUserData={setUserData} />
              }
            />
            <Route
              path="/signup"
              element={
                <Signup
                  userData={userData}
                  setUserData={setUserData}
                  cart={cart}
                  setCart={setCart}
                />
              }
            />
            <Route
              path="/products"
              element={<Products cart={cart} setCart={setCart} />}
            />
            <Route
              path="/product"
              element={
                <Product cart={cart} setCart={setCart} userData={userData} />
              }
            />
            <Route
              path="/itemPage"
              element={
                <ItemDescription
                  cart={cart}
                  setCart={setCart}
                  userData={userData}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  cart={cart}
                  setCart={setCart}
                  userData={userData}
                />
              }
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default NavbarComp;
