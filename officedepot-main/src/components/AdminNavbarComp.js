import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Navbar, Nav, Button, NavbarBrand } from "react-bootstrap";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Link,
  IndexRedirect,
} from "react-router-dom";
import Admin from "../pages/Admin";
import Employee from "../pages/Employee";
import Inventory from "../pages/Inventory";
import Order from "../pages/Order";
import Customers from "../pages/Customers";
import AdminRoutes from "./AdminRoutes";
import AdminLogin from "./AdminLogin";
//{ userData, setUserData }
const AdminNavbarComp = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar bg="dark" variant={"dark"} expand="lg">
          <Container fluid>
            <Navbar.Brand as={Link} to={"/admin"}>
              OfficeDepot(Admin)
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav>
                <Nav.Link as={Link} to={"/orders"}>
                  Orders
                </Nav.Link>
                <Nav.Link as={Link} to={"/inventory"}>
                  Inventory
                </Nav.Link>
                <Nav.Link as={Link} to={"/customers"}>
                  Customers
                </Nav.Link>
                <Nav.Link as={Link} to={"/employee"}>
                  Employees
                </Nav.Link>
                {/* {userData.name ? (
                  <Navbar.Text>Hi {userData.name}!</Navbar.Text>
                ) : (
                  <Button
                    className="ms-2"
                    variant="outline-primary"
                    as={Link}
                    to={"/signup"}
                  >
                    Sign Up/Login
                  </Button>
                )} */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div>
          <Routes>
            {/* <Route path="/" element={<Navigate to="/admin" replace={true} />} />
            <Route path="/admin" element={<Admin />} /> */}
            {/* <Route path="/employee" element={<Employee />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/customers" element={<Customers />} /> */}
            <Route element={<AdminRoutes />}>
              <Route
                path="/"
                element={<Navigate to="/admin" replace={true} />}
              />
              <Route path="/admin" element={<Admin />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/customers" element={<Customers />} />
            </Route>
            <Route path="/adminLogin" element={<AdminLogin />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AdminNavbarComp;
