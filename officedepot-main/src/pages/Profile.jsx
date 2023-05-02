import { React, useEffect, useState } from "react";
import { Row, Col, ListGroup, Badge, Alert } from "react-bootstrap";
import UserTextBoxes from "../components/UserTextBoxes";
import axios from "axios";
import {
  UPDATE_CUSTOMER_ENDPOINT,
  GET_ORDERS_BY_CUSTOMER_ENDPOINT,
} from "../constants";
import ResetScrollPos from "../components/ResetScrollPos";
import { Link, useNavigate } from "react-router-dom";

export const Profile = ({ userData, setUserData }) => {
  const [showSuccessAlert, setShowAlert] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.cart_id) {
      navigate("/home");
    }
    if (!userData.customer_id) return;
    const orderMap = {};
    axios
      .get(GET_ORDERS_BY_CUSTOMER_ENDPOINT + userData.customer_id)
      .then((response) => {
        console.log(response.data);
        for (const elemNum in response.data) {
          const elem = response.data[elemNum];
          if (elem.order_id in orderMap) {
            orderMap[elem.order_id].items.push([elem.name, elem.quantity]);
            const currWarehouse = elem.warehouse == "Warehouse 1" ? 1 : 2;
            if (
              orderMap[elem.order_id].warehouse !== currWarehouse &&
              orderMap[elem.order_id].warehouse !== 3
            ) {
              orderMap[elem.order_id].warehouse = 3;
            }
            orderMap[elem.order_id].total += parseFloat(elem.total_price);
          } else {
            orderMap[elem.order_id] = {
              items: [[elem.name, elem.quantity]],
              status: elem.status,
              total: parseFloat(elem.total_price),
              creationdate: elem.creationdate,
              deliverydate: elem.deliverydate,
              shipping_method: elem.shipping_method,
              warehouse: elem.warehouse == "Warehouse 1" ? "1" : "2",
            };
          }
        }
        let num = 1;
        console.log(orderMap);
        const newOrderData = [];
        for (const key in orderMap) {
          const currData = orderMap[key];
          currData.number = num;
          newOrderData.push(currData);
          num++;
        }
        setOrderData(newOrderData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      email,
      address,
      city,
      state,
      zip,
      ccNumber,
      expirationDate,
      cvv,
      billingAddress,
      billingCity,
      billingState,
      billingZip,
    } = userData;
    const [firstname, lastname] = name.split(" ");
    const shippingaddress = address + "\n" + city + "\n" + state + "\n" + zip;
    const billingaddressFull =
      billingAddress +
      "\n" +
      billingCity +
      "\n" +
      billingState +
      "\n" +
      billingZip;

    axios
      .put(UPDATE_CUSTOMER_ENDPOINT + email, {
        firstname: firstname,
        lastname: lastname,
        shippingaddress: shippingaddress,
        creditcard: ccNumber,
        cvv: cvv,
        expirationdate: expirationDate,
        billingaddress: billingaddressFull,
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        setShowAlert(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div style={{ minHeight: "73vh" }}>
      <Row
        style={{ marginTop: "3em", marginLeft: "2rem", marginBottom: "3em" }}
      >
        <Col md={7}>
          <h2> Edit User Data</h2>
          <UserTextBoxes
            formData={userData}
            handleChange={handleChange}
            signup={false}
            handleSubmit={handleSubmit}
          />
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
            show={showSuccessAlert}
          >
            User profile successfully updated!
          </Alert>
        </Col>
        <Col md={5}>
          <h2> Orders</h2>
          <ListGroup
            as="ol"
            style={{
              marginRight: "5px",
              padding: "10px",
              overflowY: "scroll",
              maxHeight: "80%",
              border: orderData.length > 0 ? "5px solid lightgray" : "0px",
              borderRadius: "10px"
            }}
          >
            {orderData.map((item) => (
              <>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto" style={{ textAlign: "left" }}>
                    <div className="fw-bold">Order #{item.number}</div>
                    <div>
                      <ul>
                        {item.items.map((orderItem) => {
                          return (
                            <li>
                              {orderItem[0]}, quantity: {orderItem[1]}
                            </li>
                          );
                        })}
                      </ul>
                      Status: {item.status}
                      <br></br>
                      Shipping Method: {item.shipping_method}
                      <br></br>
                      Total: {item.total}
                      <br></br>
                      <Link
                        to={{
                          pathname: "/shipping",
                        }}
                        state={{
                          shippingMethod: item.shipping_method,
                          warehouse: item.warehouse,
                        }}
                      >
                        <strong style={{ color: "blue" }}>Track Order</strong>
                      </Link>
                    </div>
                  </div>
                  <Badge bg="primary" pill>
                    {item.items.length}
                  </Badge>
                </ListGroup.Item>
              </>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <ResetScrollPos />
    </div>
  );
};
