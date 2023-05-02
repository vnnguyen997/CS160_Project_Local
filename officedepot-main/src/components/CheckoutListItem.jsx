import React from "react";
import { images } from "../productImageNames.js";
import { Button } from "react-bootstrap";
import axios from "axios";
import {
  REMOVE_CART_ITEM_ENDPOINT,
  UPDATE_CART_ITEM_QUANTITY_ENDPOINT,
} from "../constants";
function CheckoutListItem({ item, cart, setCart, canEdit, userData }) {
  const imageItem = images.find((element) => element.name === item.image);
  const options = Array.from({ length: item.stock }, (_, index) => (
    <option key={index + 1} value={index + 1}>
      {index + 1}
    </option>
  ));
  const handleSelectChange = (event) => {
    const updatedCart = cart.map((currentItem) => {
      if (currentItem.inventory_id === item.inventory_id) {
        return {
          ...currentItem,
          quantity: parseInt(event.target.value),
        };
      }
      return currentItem;
    });
    if (userData.customer_id) {
      axios
        .put(UPDATE_CART_ITEM_QUANTITY_ENDPOINT, {
          customer_id: userData.customer_id,
          inventory_id: item.inventory_id,
          newQuantity: parseInt(event.target.value),
        })
        .then((response) => {
          console.log(response.status);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setCart(updatedCart);
  };
  const handleDelete = (event) => {
    setCart((prevData) =>
      prevData.filter((cartItem) => cartItem.inventory_id !== item.inventory_id)
    );
    if (userData.customer_id) {
      //?customer_id=${customer_id}&inventory_id=${inventory_id}`
      axios
        .delete(
          REMOVE_CART_ITEM_ENDPOINT +
            "?inventory_id=" +
            item.inventory_id +
            "&customer_id=" +
            userData.customer_id
        )
        .then((response) => {
          console.log(response.status);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid black",
        borderRadius: "10px",
        height: "25vh",
        overflow: "hidden",
        textAlign: "right",
        marginBottom: "15px",
      }}
    >
      <img
        src={imageItem ? imageItem.src : ""}
        alt={item.name}
        style={{
          maxWidth: "50%",
          marginRight: "1rem",
          height: "100%",
          border: "1px solid black",
        }}
      />
      <div
        style={{
          flex: "1",
          height: "100%",
          overflow: "hidden",
          marginRight: "10px",
        }}
      >
        <h3>{item.name}</h3>
        <p>
          Quantity:
          <select
            style={{ marginLeft: "10px" }}
            value={item.quantity}
            onChange={handleSelectChange}
            disabled={!canEdit}
          >
            {options}
          </select>
        </p>
        <p>Price: ${item.price}</p>
        {!canEdit && <p>Located in {item.warehouse}</p>}
        <Button variant="danger" onClick={handleDelete} hidden={!canEdit}>
          {" "}
          Remove{" "}
        </Button>
      </div>
    </div>
  );
}

export default CheckoutListItem;
