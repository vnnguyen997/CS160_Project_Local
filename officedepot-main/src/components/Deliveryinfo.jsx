import React from "react";
import "../css/slider.css";
import styled from "styled-components";
import delivery from "../Images/delivery1.jpg";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  margin: auto;
  border: 2px solid #444;
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div`
  height: 100%;
  width: 50%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 100%;
  max-width: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
`;

const Title = styled.h1`
  font-size: 50px;
`;

const Desc = styled.p`
  margin: 30px 0px;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  color: #fff;
  background-color: #13755ece;
`;

export const Deliveryinfo = () => {
  return (
    <div className="deliveryPad">
      <Container>
        <ImgContainer>
          <Image src={delivery} />
        </ImgContainer>

        <InfoContainer>
          <Title>FREE DELIVERY</Title>
          <Desc>For Orders That Apply!</Desc>
          <Button
            as={Link}
            to={"/about"}
          >Learn More</Button>
        </InfoContainer>
      </Container>
    </div>
  );
};
