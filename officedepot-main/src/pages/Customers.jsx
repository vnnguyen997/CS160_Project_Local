import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {
  GET_ALL_CUSTOMERS_ENDPOINT,
  UPDATE_CUSTOMER_ENDPOINT,
  DELETE_CUSTOMER_ENDPOINT,
} from "../constants";

const Customers = () => {
  const [data, setData] = useState([]);
  const [addingRow, setAddingRow] = useState(false);
  const [newRowData, setNewRowData] = useState({
    customer_id: "",
    firstname: "",
    lastname: "",
    email: "",
    shippingAddress: "",
    creditcard: "",
  });
  const [showModal, setModalShow] = useState(false);
  const [rowBeingEdited, setRowBeingEdited] = useState(0);
  const columnKeys = [
    "customer_id",
    "firstname",
    "lastname",
    "email",
    "shippingaddress",
    "creditcard",
  ];

  useEffect(() => {
    async function getAllCustomers() {
      axios
        .get(GET_ALL_CUSTOMERS_ENDPOINT)
        .then((response) => {
          let customerObjects = response.data;
          setData(customerObjects);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getAllCustomers();
  }, []);

  const saveRow = (index) => {
    const { email, ...dataToPass } = data[index];
    axios
      .put(UPDATE_CUSTOMER_ENDPOINT + email, dataToPass)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setData(data);
    setRowBeingEdited(0);
  };

  const handleEditInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = data.map((row, i) => {
      if (i === index) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setData(updatedData);
  };

  const toggleEdit = (index) => {
    if (data[index].editing) {
      saveRow(index);
    } else {
      setRowBeingEdited(index);
    }
    setData(
      data.map((row, i) =>
        i === index ? { ...row, editing: !row.editing } : row
      )
    );
  };

  const handleDelete = (email) => {
    axios
      .delete(DELETE_CUSTOMER_ENDPOINT + "?email=" + email)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        setData((prevData) =>
          prevData.filter((customer) => customer.email !== email)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData({ ...newRowData, [name]: value });
  };

  const addRow = () => {
    setAddingRow(true);
  };

  const saveNewRow = () => {
    axios
      .post(UPDATE_CUSTOMER_ENDPOINT + newRowData.email, newRowData)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        setData([...data, newRowData]);
        setNewRowData({
          firstname: "",
          lastname: "",
          email: "",
          shippingAddress: "",
          creditcard: "",
        });
        setAddingRow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Customer ID</th>
            <th style={{ width: "15%" }}>First Name</th>
            <th style={{ width: "15%" }}>Last Name</th>
            <th style={{ width: "20%" }}>Email</th>
            <th style={{ width: "25%" }}>Shipping Address</th>
            <th style={{ width: "15%" }}>Credit Card</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer, index) => (
            <tr key={index}>
              {columnKeys.map((key) => {
                if (key === "editing") return null;
                const value = customer[key];
                return (
                  <td key={key}>
                    {customer.editing ? (
                      <Form.Control
                        type={key === "customer_id" || key === "creditcard" ? "number" : "text"}
                        disabled={key === "customer_id"}
                        name={key}
                        value={value}
                        onChange={(e) => handleEditInputChange(e, index)}
                      />
                    ) : (
                      value
                    )}
                  </td>
                );
              })}
              <td>
                <Button onClick={() => toggleEdit(index)}>
                  {customer.editing ? "Save" : "Edit"}
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(customer.email)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {addingRow && (
            <tr>
              {columnKeys.map((key) => (
                <td key={key} className={key}>
                  <Form.Control
                    type={key === "customer_id" || key === "creditcard" ? "number" : "text"}
                    disabled={key === "customer_id"}
                    name={key}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={newRowData[key]}
                    onChange={handleInputChange}
                  />
                </td>
              ))}
              <td>
                <Button onClick={saveNewRow}>Save</Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => setAddingRow(false)}>
                  Cancel
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Customers;
