import { React, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { images } from "../productImageNames.js";
import axios from "axios";
import {
  ADD_ITEM_TO_CART_ENDPOINT,
  UPDATE_CART_ITEM_QUANTITY_ENDPOINT,
} from "../constants";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 10px;
  max-width: 450px;
  height: 350px;
  display: flex;
  flex-basis: 30%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  max-width: 70%;
  max-height: 50%;
`;

const Text = styled.p`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Inventoryproduct = ({ item, cart, setCart, userData }) => {
  const imageItem = images.find((element) => element.name === item.image);
  const inCart = cart.find(
    (element) => element.inventory_id === item.inventory_id
  );
  const earlierQuantity = inCart ? inCart.quantity : 0;
  const [inventoryRemaining, setInventoryRemaining] = useState(
    item.stock - earlierQuantity
  );
  return (
    <Container>
      <Image src={imageItem ? imageItem.src : ""} alt={item.name + " image"} />
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
      <Info>
        <Icon
          as={Link}
          to={{
            pathname: "/itemPage",
            search: `?itemID=${item.inventory_id}`,
          }}
          state={{
            itemInfo: item ? item : undefined,
          }}
        >
          <VisibilityIcon />
        </Icon>
        <Icon hidden={inventoryRemaining <= 0}>
          {
            <ShoppingCartIcon
              onClick={() => {
                let found = false;
                let newQuantity = 0;
                const updatedCart = cart.map((currentItem) => {
                  if (currentItem.inventory_id === item.inventory_id) {
                    found = true;
                    newQuantity = currentItem.quantity + 1;
                    return {
                      ...currentItem,
                      quantity: currentItem.quantity + 1,
                    };
                  }
                  return currentItem;
                });
                if (!found) {
                  const cartItem = { ...item, quantity: 1 };
                  setCart((prevState) => [...prevState, cartItem]);
                  if (userData.customer_id) {
                    axios
                      .post(ADD_ITEM_TO_CART_ENDPOINT, {
                        customer_id: userData.customer_id,
                        inventory_id: item.inventory_id,
                        quantity: 1,
                      })
                      .then((response) => {
                        console.log(response.status);
                        console.log(response.data);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }
                } else {
                  setCart(updatedCart);
                  if (userData.customer_id) {
                    axios
                      .put(UPDATE_CART_ITEM_QUANTITY_ENDPOINT, {
                        customer_id: userData.customer_id,
                        inventory_id: item.inventory_id,
                        newQuantity: newQuantity,
                      })
                      .then((response) => {
                        console.log(response.status);
                        console.log(response.data);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }
                }
                setInventoryRemaining(inventoryRemaining - 1);
              }}
            />
          }
        </Icon>
        <div>
          {inventoryRemaining <= 0 ? (
            <p style={{ color: "red", fontSize: "20px" }}>
              <strong>Out of Stock</strong>
            </p>
          ) : (
            <p />
          )}
        </div>
      </Info>
    </Container>
  );
};

export default Inventoryproduct;
