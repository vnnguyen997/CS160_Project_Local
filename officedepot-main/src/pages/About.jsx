import React from "react";
import ResetScrollPos from "../components/ResetScrollPos";

export const About = () => {
  const containerStyle = {
    margin: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "900px",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "100px"
  };

  const headingStyle = {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "30px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
  };

  const subHeadingStyle = {
    textAlign: "left",
    fontWeight: "bold",
    marginTop: "30px",
    marginBottom: "10px",
  };

  const paragraphStyle = {
    textAlign: "left",
    margin: "10px 0",
    lineHeight: "1.5",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>About Us</h1>

      <h2 style={subHeadingStyle}>Who We Are</h2>
      <p style={paragraphStyle}>
        Welcome to OSD, your one-stop-shop for all your office supply needs! Our
        online office retailer has been providing top-notch services to our
        customers for years. We are proud to have two warehouses located in the
        bustling city of San Jose.
      </p>

      <h2 style={subHeadingStyle}>Our Mission</h2>
      <p style={paragraphStyle}>
        At OSD, our mission is to provide our customers with the best possible
        office supply shopping experience. We believe in making the process as
        seamless and convenient as possible, with easy online ordering and fast,
        reliable delivery.
      </p>

      <h2 style={subHeadingStyle}>Our Products</h2>
      <p style={paragraphStyle}>
        We understand that our customers have busy schedules and may not always
        have the time to visit a physical store. That's why we have made all our
        products available online. Our warehouses do not have a showroom, but
        you can easily browse and purchase our products on our website.
      </p>

      <h2 style={subHeadingStyle}>Pickup and Delivery Services</h2>
      <p style={paragraphStyle}>
        If you prefer to pick up your order, we have a designated area at our
        warehouses where you can retrieve your prepaid items. We also offer free
        delivery services for orders over $100.00. For orders that weigh less
        than 15lbs, we even offer same-day delivery by drone during business
        hours. For larger orders, we ensure delivery by our reliable delivery
        truck within 2 business days. For orders that are under $100.00,
        customers can still request delivery (by drone or truck) by paying a
        surcharge of $20.00. If you need same-day delivery for orders over
        $100.00, you can opt for this service by paying a surcharge of $25.00.
      </p>

      <h2 style={subHeadingStyle}>Customer Service</h2>
      <p style={paragraphStyle}>
        We take pride in our commitment to providing excellent customer service.
        Our team is always ready to assist you with any queries you may have.
        Thank you for choosing OSD as your go-to online office retailer. We look
        forward to serving you and meeting all your office supply needs!
      </p>
      <ResetScrollPos />
    </div>
  );
};

export default About;
