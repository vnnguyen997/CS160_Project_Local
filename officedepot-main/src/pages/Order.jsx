import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {
  GET_ALL_ORDERS_ENDPOINT,
  UPDATE_ORDER_ENDPOINT,
  DELETE_ORDER_ENDPOINT,
} from "../constants";
export const Order = () => {
  const [data, setData] = useState([]);
  const columnKeys = [
    "id",
    "created_at",
    "customer_id",
    "items",
    "shipping_method",
    "status",
    "warehouse",
  ];

  const handleDelete = (indexToDelete) => {
    console.log(data[indexToDelete].id);
    axios
      .delete(DELETE_ORDER_ENDPOINT, { order_id: data[indexToDelete].id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setData((prevData) =>
      prevData.filter((_, index) => index !== indexToDelete)
    );
  };
  const handleEditDropDown = (key, eventKey, index) => {
    axios
      .put(UPDATE_ORDER_ENDPOINT + data[index].id, { [key]: eventKey })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const updatedData = data.map((row, i) => {
      if (i === index) {
        return { ...row, [key]: eventKey };
      }
      return row;
    });
    setData(updatedData);
  };
  useEffect(() => {
    axios
      .get(GET_ALL_ORDERS_ENDPOINT)
      .then((response) => {
        const orderMap = {};
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
          } else {
            orderMap[elem.order_id] = {
              id: elem.order_id,
              items: [[elem.name, elem.quantity]],
              status: elem.status,
              created_at: elem.creationdate,
              customer_id: elem.customer_id,
              shipping_method: elem.shipping_method,
              warehouse: elem.warehouse == "Warehouse 1" ? 1 : 2,
            };
          }
        }
        const newOrderData = [];
        for (const key in orderMap) {
          orderMap[key].items = orderMap[key].items.reduce(
            (acc, curr) => acc + curr[0] + " x" + curr[1] + ", ",
            ""
          );
          orderMap[key].created_at = orderMap[key].created_at.split(" ")[0];
          if (orderMap[key].warehouse === 3) {
            orderMap[key].warehouse = "1 & 2";
          }
          newOrderData.push(orderMap[key]);
        }
        console.log(newOrderData);
        setData(newOrderData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ width: "5%" }}>ID</th>
          <th style={{ width: "15%" }}>Created At</th>
          <th style={{ width: "10%" }}>Customer ID</th>
          <th style={{ width: "35%" }}>Items</th>
          <th style={{ width: "10%" }}>Shipping Method</th>
          <th style={{ width: "10%" }}>Status</th>
          <th style={{ width: "10%" }}>Warehouse(s)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columnKeys.map((key) => {
              if (key === "editing") return null;
              const value = row[key];
              return (
                <td key={key}>
                  {key === "status" || key === "shipping_method" ? (
                    <Dropdown
                      name={key}
                      onSelect={(eventKey) =>
                        handleEditDropDown(key, eventKey, index)
                      }
                    >
                      <Dropdown.Toggle variant="primary" id="status-dropdown">
                        {value}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          eventKey={key === "status" ? "pending" : "truck"}
                        >
                          {key === "status" ? "pending" : "truck"}
                        </Dropdown.Item>
                        {key === "status" && (
                          <Dropdown.Item
                            eventKey={key === "status" ? "in transit" : "drone"}
                          >
                            {key === "status" ? "in transit" : "drone"}
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item
                          eventKey={key === "status" ? "delivered" : "pick up"}
                        >
                          {key === "status" ? "delivered" : "pick up"}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    value
                  )}
                </td>
              );
            })}
            <td>
              <Button variant="danger" onClick={() => handleDelete(index)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Order;
