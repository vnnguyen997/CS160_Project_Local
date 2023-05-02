import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CheckoutListItem from "../components/CheckoutListItem";
import CartTotal from "../components/CartTotal";
import CartSummary from "../components/CartSummary";
import ResetScrollPos from "../components/ResetScrollPos";

function Cart({ cart, setCart, userData }) {
  return (
    <div style={{ padding: "10px ", minHeight: "77vh" }}>
      <h1>Your Cart</h1>
      <div>
        <CartSummary
          cart={cart}
          setCart={setCart}
          isCart={true}
          userData={userData}
        ></CartSummary>
        <br />
      </div>
      <hr />
      {userData.cart_id ? (
        <Button
          variant="outline-primary"
          as={Link}
          to={"/checkout"}
          hidden={cart.length == 0}
        >
          Proceed to checkout
        </Button>
      ) : (
        "You must be signed in to place an order"
      )}
      <ResetScrollPos />
    </div>
  );
}

export default Cart;
