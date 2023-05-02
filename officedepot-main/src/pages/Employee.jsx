import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {
  CREATE_EMPLOYEE_ENDPOINT,
  DISPLAY_EMPLOYEE_ENDPOINT,
} from "../constants";
const Employee = () => {
  const [data, setData] = useState([]);
  const [addingRow, setAddingRow] = useState(false);
  const [validName, setValidName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [newRowData, setNewRowData] = useState({
    name: "",
    email: "",
    password: "",
    employee_id: "",
  });
  const firstLastRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    async function getAllEmployees() {
      axios
        .get(DISPLAY_EMPLOYEE_ENDPOINT)
        .then((response) => {
          let employeeObjects = response.data;
          const newArray = employeeObjects.map((item) => {
            return {
              ...item,
              name: item.firstname + " " + item.lastname,
              firstname: undefined,
              lastname: undefined,
            };
          });
          setData(newArray);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getAllEmployees();
  }, []);

  const addRow = () => {
    setAddingRow(true);
  };

  const saveRow = () => {
    if (!validName || !validEmail) {
      return;
    }
    setData([...data, { name: newRowData.name, email: newRowData.email }]);
    const [firstname, lastname] = newRowData.name.split(" ");
    axios
      .post(CREATE_EMPLOYEE_ENDPOINT, {
        firstname: firstname,
        lastname: lastname,
        email: newRowData.email,
        password: newRowData.password,
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setNewRowData({ name: "", email: "", password: "", employee_id: "" });
    setAddingRow(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData({ ...newRowData, [name]: value });

    if (name === "name" && !value.match(firstLastRegex)) {
      setValidName(false);
    }
    else if (name === "name" && value.match(firstLastRegex)) {
      setValidName(true);
    }
    else if (name === "email" && !value.match(emailRegex)) {
      setValidEmail(false);
    }
    else if (name === "email" && value.match(emailRegex)) {
      setValidEmail(true);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee Email</th>
            {addingRow && <th>Password</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.email}</td>
            </tr>
          ))}
          {addingRow && (
            <tr>
              <td>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Employee Name"
                  value={newRowData.name}
                  onChange={handleInputChange}
                  isInvalid={!validName}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter in the format "firstname lastname".
                </Form.Control.Feedback>
              </td>
              <td>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Employee Email"
                  value={newRowData.email}
                  onChange={handleInputChange}
                  isInvalid={!validEmail}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </td>
              <td>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Set Password"
                  value={newRowData.password}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {!addingRow ? (
        <Button onClick={addRow}>Add New Employee</Button>
      ) : (
        <Button onClick={saveRow}>Save</Button>
      )}
    </>
  );
};

export default Employee;
