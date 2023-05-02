import React from 'react'
import styled from 'styled-components';

import orderTemplate from "../Images/orderTemplate.jpeg"
import inventoryTemplate from "../Images/inventoryTemplate.jpeg"
import customersTemplate from "../Images/customersTemplate.jpeg"
import employeesTemplate from "../Images/employeesTemplate.jpeg"
import {Link} from 'react-router-dom';

const RedContainer = styled.div`
  

`;

const OrangeContainer = styled.div`
  display: flex;
  margin: 30px;
`;

const GreenContainer = styled.div`
  margin-top: 100px;
  display:flex;
  justify-content: space-around;
  
  
`;

const AdminNameItem = styled.div`
  padding: 10px 30px 5px; /*goes top, right-left, bottom */
  border: 2px solid #333;
  background-color: lightgrey;
`;

const CategoryContainer = styled.div`
  display:flex;
  width: 325px;
  height: 325px;
  background-color: lightgrey;
  justify-content: center;
  align-items: center;
`;

const ImgWrapper = styled.div`
  margin-top: 15px;
`;

const Image = styled.img`
  border: 2px solid #333;
  width: 325px;
  height: 325px;

  transition: transform 0.2s ease-out;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.1);
    filter: brightness(80%);
  }
`;

export const admin = () => {
  return (
    <div>

        <RedContainer> 

            <OrangeContainer> {/* Admin Name */}
              <AdminNameItem> 
                <h6> Admin  </h6>
              </AdminNameItem>
            </OrangeContainer>

            <GreenContainer> {/* The four categories */}
              <CategoryContainer>
                <ImgWrapper as={Link} to={"/orders"}>
                  <figure className="position-relative">
                    <Image src={orderTemplate} alt="orderTemplate" />

                    <figcaption >
                      Orders
                    </figcaption>

                  </figure>
    
                </ImgWrapper>
              </CategoryContainer>
                
              <CategoryContainer>
                <ImgWrapper as={Link} to={"/inventory"}>
                  <figure className="position-relative">
                    <Image src={inventoryTemplate} alt="inventoryTemplate" />

                    <figcaption >
                      Inventory
                    </figcaption>

                  </figure>
    
                </ImgWrapper>
              </CategoryContainer>
                
              <CategoryContainer>
                <ImgWrapper as={Link} to={"/customers"}>
                  <figure className="position-relative">
                    <Image src={customersTemplate} alt="customersTemplate" />

                    <figcaption >
                      Customers
                    </figcaption>

                  </figure>
    
                </ImgWrapper>
              </CategoryContainer>

              <CategoryContainer>
                <ImgWrapper as={Link} to={"/employee"}>
                    <figure className="position-relative">
                      <Image src={employeesTemplate} alt="employeesTemplate" />

                      <figcaption >
                        Employees
                      </figcaption>

                    </figure>
      
                  </ImgWrapper>
              </CategoryContainer>
            </GreenContainer>

        </RedContainer>
        
    </div>
  )
}

export default admin;