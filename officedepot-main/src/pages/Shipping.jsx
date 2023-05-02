import React from "react";
import { useLocation } from "react-router-dom";
import Map from "../components/Map.js";

export const Shipping = ({ userData }) => {
  const location = useLocation();
  const { shippingMethod, warehouse } = location.state;

  if (shippingMethod === "pickup") {
    if (warehouse === "1") {
      console.log("pickup on warehouse 1");
      return (
        <div>
          <h1> Pickup Information</h1>
          <Map userData={userData} warehouse={warehouse} />
          <p><strong>NOTE</strong>: You may have an invalid shipping address if directions don't display.</p>
        </div>
      );
    } else if (warehouse === "2") {
      console.log("pickup on warehouse 2");
      return (
        <div>
          <h1> Pickup Information</h1>
          <Map userData={userData} warehouse={warehouse} />
          <p><strong>NOTE</strong>: You may have an invalid shipping address if directions don't display.</p>
        </div>
      );
    } else {
      //pickup on either warehouses; show both maps
      return (
        <div>
          <h1> Pickup Information </h1>
          <h2> Warehouse 1 </h2>
          <Map userData={userData} warehouse={"1"} />
          <br></br>
          <br></br>
          <h2> Warehouse 2 </h2>
          <Map userData={userData} warehouse={"2"} />
          <p><strong>NOTE</strong>: You may have an invalid shipping address if directions don't display.</p>
        </div>
      );
    }
  } else if (shippingMethod === "drone" || shippingMethod === "truck") {
    console.log("not pickup");
    return (
      <div>
        <h1> Delivery Information</h1>
        <Map userData={userData} warehouse={warehouse} />
        <p><strong>NOTE</strong>: OSD is not responsible for lost packages if your shipping address is invalid.</p>
      </div>
    );
  }

  return null;
};

export default Shipping;
