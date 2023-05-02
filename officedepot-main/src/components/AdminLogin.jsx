import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMPLOYEE_LOGIN_ENDPOINT } from "../constants";
import { Alert } from "react-bootstrap";
import axios from "axios";

function AdminLogin() {
  // styling
  const pageStyle = {
    border: "1px solid black",
    padding: "20px",
  };

  const headerStyle = {
    marginBottom: "20px",
  };

  const inputStyle = {
    border: "1px solid black",
    marginBottom: "10px",
    padding: "5px",
    borderRadius: "5px",
  };

  const submitStyle = {
    border: "1px solid black",
    borderRadius: "5px",
    padding: "5px",
  };

  const [validated, setValidated] = useState(() => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].startsWith("adminAccess")) {
        return true;
      }
    }
    return false;
  });
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const validateLogin = (e) => {
    e.preventDefault();
    axios
      .post(EMPLOYEE_LOGIN_ENDPOINT, {
        email: e.target.adminUser.value,
        password: e.target.adminPassword.value,
      })
      .then((response) => {
        console.log("employee login response", response);
        console.log("gonna set a cookie now");
        const expireDate = new Date(Date.now() + 60000).toUTCString();
        document.cookie = "adminAccess; expires=" + expireDate + "; path=/";
        setValidated(true);
      })
      .catch((error) => {
        setShowAlert(true);
        console.log(error);
      });
  };

  if (!validated) {
    return (
      <div style={pageStyle}>
        <h1 style={headerStyle}>Login (Admin)</h1>
        <form onSubmit={validateLogin}>
          <input
            name="adminUser"
            placeholder="Enter username"
            style={inputStyle}
          />
          <br />
          <input
            type="password"
            name="adminPassword"
            placeholder="Enter password"
            style={inputStyle}
          />
          <br />
          <button type="submit" style={submitStyle}>
            Submit
          </button>
        </form>
        <Alert
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
          show={showAlert}
        >
          Your login info was not found in the system.
        </Alert>
      </div>
    );
  }

  return navigate("/admin");
}

export default AdminLogin;
