import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import CartSummary from "../components/CartSummary";
import axios from "axios";
import { CHECKOUT_ENDPOINT } from "../constants";
import { useNavigate } from "react-router-dom";
function CheckoutPage({ cart, setCart, userData }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const shippingOptions = ["pickup", "drone", "truck"];
  const warehouse1ItemString = cart
    .filter((item) => item.warehouse === "Warehouse 1")
    .reduce((accumulator, item) => {
      return item.name + ", " + accumulator;
    }, "");

  const warehouse2ItemString = cart
    .filter((item) => item.warehouse === "Warehouse 2")
    .reduce((accumulator, item) => {
      return item.name + ", " + accumulator;
    }, "");
  const totalWeight = cart.reduce((sum, currentItem) => {
    return sum + parseInt(currentItem.weight);
  }, 0);

  const subtotal = cart
    ? cart.reduce((sum, currentItem) => {
        return sum + currentItem.quantity * currentItem.price;
      }, 0)
    : 0;

  const handleSelect = (index) => {
    setSelected(index);
  };

  const calculateShippingCost = () => {
    if (selected === 0 || subtotal > 100) {
      return 0.0;
    }
    return 25.0;
  };

  const circleStyle = (isSelected) => ({
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    marginRight: "10px",
    display: "inline-block",
    verticalAlign: "middle",
    background: isSelected ? "green" : "white",
    border: "1px solid green",
  });

  const handleCheckout = () => {
    axios
      .post(CHECKOUT_ENDPOINT, {
        customer_id: userData.customer_id,
        shipping_method: shippingOptions[selected],
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        setCart([]);
        navigate("/profile", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ padding: "10px", minHeight: "78vh" }}>
      <h1>Checkout</h1>
      <div>
        <CartSummary
          cart={cart}
          setCart={setCart}
          isCart={false}
          shippingCost={selected !== null ? calculateShippingCost() : null}
        ></CartSummary>
      </div>

      <div style={{ clear: "both" }}>
        <hr />
        <h3 style={{ textAlign: "left" }}>Review Order Details</h3>
        <ListGroup as="ol" numbered>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between-align-items-start"
          >
            <div className="ms-2 me-auto" style={{ textAlign: "left" }}>
              <div className="fw-bold">Shipping Address</div>
              {userData.name} <br />
              {userData.address}, {userData.city}, {userData.state},{" "}
              {userData.zip}
            </div>
          </ListGroup.Item>

          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between-align-items-start"
          >
            <div className="ms-2 me-auto" style={{ textAlign: "left" }}>
              <div className="fw-bold">Payment Method</div>
              Credit card ending in {parseInt(userData.ccNumber) % 10000}
            </div>
          </ListGroup.Item>

          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between-align-items-start"
          >
            <div className="ms-2 me-auto" style={{ textAlign: "left" }}>
              <div className="fw-bold">Billing Address</div>
              {userData.billingAddress}, {userData.billingCity},{" "}
              {userData.billingState}, {userData.billingZip}
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>

      <ListGroup style={{ textAlign: "left" }}>
        <ListGroup.Item action onClick={() => handleSelect(0)}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={circleStyle(selected === 0)}></span>
            <h4 className="mb-0">Pickup</h4>
          </div>
          <p>Policy: Free for all orders!</p>
          <p>See your pickup location(s) below:</p>
          <Row>
            <Col md="6">
              {warehouse1ItemString && (
                <>
                  <h5>Warehouse 1</h5>
                  <p>Items in Warehouse 1: {warehouse1ItemString}</p>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25379.353862093725!2d-121.88057599999999!3d37.3325824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fccd4f21df13d%3A0x45d9bee310def4b8!2sWalmart%20Supercenter!5e0!3m2!1sen!2sus!4v1681338387840!5m2!1sen!2sus"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Warehouse 1 Location"
                  ></iframe>
                </>
              )}
            </Col>
            <Col md="6">
              {warehouse2ItemString && (
                <>
                  <h5>Warehouse 2</h5>
                  <p>Items in Warehouse 2: {warehouse2ItemString}</p>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15768.649929235053!2d-121.86324388821839!3d37.32891718662735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e32e126db5191%3A0x9c5c13faae9ed5ef!2sCostco%20Wholesale!5e0!3m2!1sen!2sus!4v1681616967720!5m2!1sen!2sus"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Warehouse 2 Location"
                  ></iframe>
                </>
              )}
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item
          action
          onClick={() => handleSelect(1)}
          disabled={totalWeight > 15}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={circleStyle(selected === 1)}></span>
            <h4 className="mb-0">Drone Delivery</h4>
          </div>
          <p>
            Policy: Applicable for orders that weigh less than 15lbs. For orders
            under $100, there is a $25 surcharge.
          </p>
          <p>
            Total weight for this order: {(totalWeight * 1.0).toFixed(2)} lbs
          </p>
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => handleSelect(2)}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={circleStyle(selected === 2)}></span>
            <h4 className="mb-0">Truck Delivery</h4>
          </div>
          <p>
            Policy: Free for orders over $100. For orders under $100, there is a
            $25 surcharge.
          </p>
        </ListGroup.Item>
      </ListGroup>

      <div style={{ clear: "both" }}>
        <Button
          variant="primary"
          type="submit"
          size="md"
          style={{ marginTop: "2rem" }}
          hidden={selected === null}
          onClick={handleCheckout}
        >
          Confirm order
        </Button>
      </div>
    </div>
  );
}

function totalFee(orderFee, orderWeight, droneRequest, truckRequest) {
  let surchargeFee = 0;
  let shippingDuration = 2;
  let droneDelivery = false;
  let truckDelivery = false;
  let feeWithShipping;
  let totalAmount;

  if (orderFee >= 100) {
    if (orderWeight < 15) {
      droneDelivery = true;
      shippingDuration = 1;
    } else {
      truckDelivery = true;

      if (truckRequest) {
        //same day truck delivery request
        shippingDuration = 1;
        surchargeFee += 25;
      }
    }
  } else {
    //if orderFee < 100
    truckDelivery = true;

    if (truckRequest || droneRequest) {
      shippingDuration = 1;
      surchargeFee += 20;
    }
  }

  feeWithShipping = orderFee + surchargeFee;
  let tax = 0.09 * feeWithShipping;
  totalAmount = feeWithShipping + tax;
  totalAmount = totalAmount.toFixed(2);

  return totalAmount;
}

export default CheckoutPage;
