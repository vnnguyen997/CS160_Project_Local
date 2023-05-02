import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoutes() {
  // const [validated, setValidated] = useState(!!Cookies.get('adminAccess'));
  const [validated, setValidated] = useState(() => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].startsWith("adminAccess")) {
        return true;
      }
    }
    return false;
  });
  return (
    <div>
      {console.log(validated)}
      {validated ? <Outlet /> : <Navigate to="/adminLogin" />}
    </div>
  );
}

export default AdminRoutes;
