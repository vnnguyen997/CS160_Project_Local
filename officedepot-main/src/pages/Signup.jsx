import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/signup.css";
import axios from "axios";
import UserTextBoxes from "../components/UserTextBoxes";
import {
  CREATE_CUSTOMER_ENDPOINT,
  USER_LOGIN_ENDPOINT,
  GET_ITEMS_BY_CART_ID_ENDPOINT,
  BULK_ADD_ITEMS_TO_CART_ENDPOINT,
  FIND_ITEM_BY_ID_ENDPOINT,
} from "../constants";
import ResetScrollPos from "../components/ResetScrollPos";

export const Signup = ({ userData, setUserData, cart, setCart }) => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false); // state to toggle between sign up and log in
  const toggleLogin = () => setShowLogin(!showLogin); // function to toggle between sign up and log in
  const [showFailedAlert, setFailedAlert] = useState(false);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.id]: event.target.value,
    });
  };

  const pullCart = (cartId) => {
    axios
      .get(GET_ITEMS_BY_CART_ID_ENDPOINT + cartId)
      .then((response) => {
        setCart(response.data);
        navigate("/home", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const populateCart = (cartId, customerId) => {
    if (cart) {
      const inventoryIds = [];
      const quantities = [];
      cart.forEach((item) => {
        inventoryIds.push(item.inventory_id);
        quantities.push(item.quantity);
      });
      console.log(customerId);
      console.log(inventoryIds);
      console.log(quantities);
      axios
        .post(BULK_ADD_ITEMS_TO_CART_ENDPOINT, {
          customer_id: customerId,
          inventory_ids: inventoryIds,
          quantities: quantities,
        })
        .then((response) => {
          console.log(response.data);
          pullCart(cartId);
        })
        .catch((error) => {
          console.log(error);
          pullCart(cartId);
        });
    } else {
      pullCart(cartId);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!showLogin) {
      const {
        name,
        email,
        password,
        address,
        city,
        state,
        zip,
        ccNumber,
        cvv,
        expirationDate,
        billingAddress,
        billingCity,
        billingState,
        billingZip,
      } = userData;
      const [firstname, lastname] = name.split(" ");
      const shippingaddress = address + "\n" + city + "\n" + state + "\n" + zip;
      const billingaddress =
        billingAddress +
        "\n" +
        billingCity +
        "\n" +
        billingState +
        "\n" +
        billingZip;
      axios
        .post(CREATE_CUSTOMER_ENDPOINT, {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          shippingaddress: shippingaddress,
          creditcard: ccNumber,
          cvv: cvv,
          expirationdate: expirationDate,
          billingaddress: billingaddress,
        })
        .then((response) => {
          console.log(response.status);
          console.log(response.data);
          setUserData({
            ...userData,
            customer_id: response.data["customer_id"],
            cart_id: response.data["shopping_cart"]["id"],
          });
          populateCart(
            response.data["shopping_cart"]["id"],
            response.data["customer_id"]
          );
        })
        .catch((error) => {
          setFailedAlert(true);
          console.log(error);
        });
    } else {
      const { loginEmail, loginPassword } = userData;
      axios
        .post(USER_LOGIN_ENDPOINT, {
          email: loginEmail,
          password: loginPassword,
        })
        .then((response) => {
          const addressStr =
            response.data["user"]["shippingaddress"].split("\n");
          const billingAddressStr =
            response.data["user"]["billingaddress"].split("\n");
          setUserData({
            ...userData,
            ccNumber: response.data["user"]["creditcard"],
            email: response.data["user"]["email"],
            name:
              response.data["user"]["firstname"] +
              " " +
              response.data["user"]["lastname"],
            password: response.data["user"]["password"],
            address: addressStr[0],
            city: addressStr[1],
            state: addressStr[2],
            zip: addressStr[3],
            customer_id: response.data["user"]["customer_id"],
            cvv: response.data["user"]["cvv"],
            expirationDate: response.data["user"]["expirationdate"],
            billingAddress: billingAddressStr[0],
            billingCity: billingAddressStr[1],
            billingState: billingAddressStr[2],
            billingZip: billingAddressStr[3],
            cart_id: response.data["shoppingCart"]["id"],
          });
          populateCart(
            response.data["shoppingCart"]["id"],
            response.data["user"]["customer_id"]
          );
        })
        .catch((error) => {
          setFailedAlert(true);
          console.log(error);
        });
    }
  };

  return (
    <div className="signup-pad">
      <div
        className="signup-container"
        style={{ display: "flex", flexFlow: "column" }}
      >
        {!showLogin && (
          <UserTextBoxes
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formData={userData}
            signup={true}
          />
        )}

        <p
          onClick={toggleLogin}
          style={{
            cursor: "pointer",
            marginTop: "10px",
            display: "block",
          }}
        >
          {showLogin ? "I don't have an account!" : "Or, log in instead"}
        </p>

        <Form onSubmit={handleSubmit}>
          <Col>
            {showLogin && (
              <div>
                <Form.Group controlId="loginEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Email"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  size="md"
                  style={{ marginTop: "2rem" }}
                >
                  Log In
                </Button>
              </div>
            )}
          </Col>
        </Form>
        <Alert
          variant="danger"
          onClose={() => setFailedAlert(false)}
          dismissible
          show={showFailedAlert}
        >
          Make sure all fields are filled in when signing up, and double check
          your username and password while logging in. Try using a different
          email address.
        </Alert>
      </div>
      <ResetScrollPos />
    </div>
  );
};

export default Signup;
