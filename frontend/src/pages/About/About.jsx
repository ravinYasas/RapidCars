import "./About.css";
import { assets } from "../../assets/assets";

import React from "react";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-up">
        <div className="about-up-topic">
        <h2>
          ABOUT <span>US</span>
        </h2>
        <p className="about-bar"></p>
        </div>
        <div className="about-middle">
          <img src={assets.about_img} alt="" />
          <p>
          <p className="about-paragraph">
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes. </p>
            <p className="about-paragraph">
            Since our inception, we've worked tirelessl to curate a diverse selection of high-quality products that cater to
            every taste and preference. From fashion and beauty to electronics
            and home essentials, we offer an extensive collection sourced from
            trusted brands and suppliers.
            </p>
            <p className="about-paragraph">
            <span> Our Mission </span>
            <br />
            Our mission at Forever is to empower customers with choice, convenience, and confidence. We're
            dedicated to providing a seamless shopping experience that exceeds
            expectations, from browsing and ordering to delivery and beyond.
          </p>
          </p>
        </div>
      </div>
      <div className="about-down">
        <div className="about-down-title">
        <h2>WHY <span>CHOOSE US</span></h2>
        <p className="about-bar"></p>
        </div>
        <div className="about-down-box">
          <div className="about-down-box-container">
            <h4>QUALITY  ASSURANCE:</h4>
            <p>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className="about-down-box-container">
            <h4>CONVENIENCE:</h4>
            <p>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className="about-down-box-container">
            <h4>EXCEPTIONAL CUSTOMER SERVICES:</h4>
            <p>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
