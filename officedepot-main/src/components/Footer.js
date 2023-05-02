import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import RoomIcon from "@mui/icons-material/Room";
import styled from "styled-components";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const MediaIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

export const Footer = () => {
  return (
    <div className="bg-light">
      <div className="container py-4">
        <Row>
          <Col lg={4}>
            <div className="py-3">
              <h1>OfficeDepot</h1>
              <p className="text-muted">
                OfficeDepot is dedicated to selling the best items in the
                market. We take pride in offering our customers the best
                products in the market, and we never compromise on the quality
                of the items we sell. Our vast list of products is carefully
                curated to ensure that every item meets our high standards of
                excellence.
              </p>
            </div>
          </Col>
          <Col lg={4}>
            <div className="py-3">
              <h3>Links</h3>
              <ul className="list-unstyled">
                <li>
                  <Link to="/about" className="text-muted">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-muted">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-muted">
                    Collections
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={4}>
            <div className="py-3">
              <h3>Contact</h3>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <div className="d-flex align-items-center">
                    <RoomIcon style={{ marginRight: "10px" }} />
                    <span>1 Washington Sq, San Jose, CA 95192</span>
                  </div>
                </li>
                <li className="mb-2">
                  <div className="d-flex align-items-center">
                    <PhoneIphoneIcon style={{ marginRight: "10px" }} />
                    <span>+1(800)-Office-Depot</span>
                  </div>
                </li>
                <li className="mb-2">
                  <div className="d-flex align-items-center">
                    <MailOutlineIcon style={{ marginRight: "10px" }} />
                    <span>officedepot@gmail.com</span>
                  </div>
                </li>
                <li>
                  <div className="d-flex">
                    <MediaIcon color="3B5999" className="mr-3">
                      <FacebookIcon />
                    </MediaIcon>
                    <MediaIcon color="55ACEE" className="mr-3">
                      <TwitterIcon />
                    </MediaIcon>
                    <MediaIcon color="E4405F" className="mr-3">
                      <InstagramIcon />
                    </MediaIcon>
                    <MediaIcon color="FF0000" className="mr-3">
                      <YouTubeIcon />
                    </MediaIcon>
                    <MediaIcon color="BD081C">
                      <PinterestIcon />
                    </MediaIcon>
                  </div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <div className="border-top pt-3">
          <p className="text-center text-muted">
            &copy; {new Date().getFullYear()} OfficeDepot. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
