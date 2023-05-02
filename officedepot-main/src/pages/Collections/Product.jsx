import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Inventoryproducts } from "../../components/Inventoryproducts";
import ResetScrollPos from "../../components/ResetScrollPos";

const Title = styled.h1`
  margin-top: 20px;
  text-transform: capitalize;
`;

const Container = styled.div`
  @media (min-width: 576px) {
    max-width: 540px;
    margin: 0 auto;
  }
  @media (min-width: 768px) {
    max-width: 1200px;
  }
  @media (min-width: 992px) {
    max-width: 1560px;
  }
  @media (min-width: 1200px) {
    max-width: 1800px;
  }
`;

export const Product = ({ cart, setCart, userData }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemgroup = searchParams.get("itemgroup");
  const itemProps = location.state?.itemProps;
  console.log(itemProps);

  const navigate = useNavigate();

  useEffect(() => {
    if (itemProps === null || typeof itemProps === 'undefined') {
      navigate('/products');
    }
  }, [itemProps])

  return (
    <Container>
      <Title>
        {itemgroup
          ? itemgroup.charAt(0).toUpperCase() + itemgroup.slice(1).toLowerCase()
          : "Chairs"}
      </Title>

      <div>
        <Inventoryproducts
          itemProps={itemProps}
          cart={cart}
          setCart={setCart}
          userData={userData}
        />
      </div>
      <ResetScrollPos />
    </Container>
  );
};
