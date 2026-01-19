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
          <div className="about-text">
            <p className="about-paragraph">
              Rapid Cars exists to make Japanese vehicle imports clear, predictable, and honest. We manage the entire journey from auction to handover with full transparency, so buying a vehicle never feels confusing or risky.
            </p>
            <p className="about-paragraph">
              You see the original auction sheets, understand trims and options, and get an exact price breakdown with no hidden costs. We open LC in your name, convert in-car systems to English, and guide you through every feature before you drive away.
            </p>
            <p className="about-paragraph">
              <span>Our Mission</span>
              <br />
              Deliver trust-first vehicle imports from Japan by combining transparency, technical guidance, and long-term customer care.
            </p>
          </div>
        </div>
      </div>
      <div className="about-down">
        <div className="about-down-title">
        <h2>WHY <span>CHOOSE US</span></h2>
        <p className="about-bar"></p>
        </div>
        <div className="about-down-box">
          <div className="about-down-box-container">
            <h4>TRANSPARENT AUCTION DATA</h4>
            <p>Original Japanese auction sheets, verified mileage, and condition reports for every vehicle.</p>
          </div>
          <div className="about-down-box-container">
            <h4>LC IN YOUR NAME</h4>
            <p>Financial clarity with LC opened directly in your name and a clear landed-cost breakdown.</p>
          </div>
          <div className="about-down-box-container">
            <h4>DELIVERY-READY HANDOVER</h4>
            <p>English conversions, feature walkthroughs, and ongoing support to keep you confident on every drive.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
