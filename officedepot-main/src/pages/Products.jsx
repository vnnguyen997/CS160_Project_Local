import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/productCollection.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { GET_ALL_INVENTORY_ENDPOINT, STANDARD_ITEM_GROUPS } from "../constants";
import otherCollection from "../Images/otherCollection.jpg";
import ResetScrollPos from "../components/ResetScrollPos";

const StyledContainer = styled(Container)`
  max-width: 3000px;
  margin-bottom: 20px;
`;

const ImgContainer = styled(Row)`
  margin-top: 20px;
  justify-content: center;
`;

const ImgWrapper = styled(Col)`
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  flex-basis: 30%;
`;

const Image = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 66.67%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  transition: transform 0.2s ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    filter: brightness(80%);
  }
`;

export const Products = ({ cart, setCart }) => {
  const [inventoryItems, setInventoryItems] = useState(null);

  useEffect(() => {
    async function getAllInventory() {
      axios
        .get(GET_ALL_INVENTORY_ENDPOINT)
        .then((response) => {
          let itemObjects = response.data;
          let itemGroupDict = {};
          for (let i = 0; i < itemObjects.length; i++) {
            let item = itemObjects[i];
            if (!(item.itemgroup in itemGroupDict)) {
              itemGroupDict[item.itemgroup] = [];
            }
            itemGroupDict[item.itemgroup].push(item);
          }

          setInventoryItems(itemGroupDict);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (inventoryItems === null) {
      getAllInventory();
    }
  }, [inventoryItems]);

  console.log("inventoryItems", inventoryItems);

  return (
    <div>
      <h1> All Collections </h1>

      <StyledContainer>
        <ImgContainer>
          {STANDARD_ITEM_GROUPS.map(({ itemGroup, imageSrc, caption }) => (
            <ImgWrapper
              key={itemGroup}
              as={Link}
              to={{
                pathname: "/product",
                search: `?itemgroup=${itemGroup}`,
              }}
              state={{
                itemProps: inventoryItems
                  ? itemGroup in inventoryItems
                    ? inventoryItems[itemGroup]
                    : []
                  : undefined,
              }}
            >
              <figure className="position-relative">
                <Image src={imageSrc} alt={`${itemGroup} Collection`} />
                <figcaption>{caption}</figcaption>
              </figure>
            </ImgWrapper>
          ))}
          <ImgWrapper
            as={Link}
            to={{
              pathname: "/product",
              search: `?itemgroup=other`,
            }}
            state={{
              itemProps: inventoryItems
                ? Object.keys(inventoryItems).reduce(
                    (items, key) => {
                      console.log(items, key);
                      const itemGroupCategory = STANDARD_ITEM_GROUPS.find(
                        (group) => group.itemGroup === key
                      );
                      if (!itemGroupCategory) {
                        const otherItems = items["other"] || [];
                        items["other"] = otherItems.concat(inventoryItems[key]);
                      }
                      return items;
                    },
                    { other: [] }
                  ).other
                : undefined,
            }}
          >
            <figure className="position-relative">
              <Image src={otherCollection} alt="other Collection" />
              <figcaption>Other</figcaption>
            </figure>
          </ImgWrapper>
        </ImgContainer>
      </StyledContainer>
      <ResetScrollPos />
    </div>
  );
};
