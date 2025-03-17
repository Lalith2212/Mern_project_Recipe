import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faSnapchat, faGoogle } from "@fortawesome/free-brands-svg-icons";
import "../App.css"; // Make sure the CSS file is imported

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Contact Us</h3>
        <div className="footer-icons">
          <FontAwesomeIcon icon={faEnvelope} />
          <FontAwesomeIcon icon={faGoogle} />
          <FontAwesomeIcon icon={faPhone} />
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faSnapchat} />
        </div>
        <a href="#" className="support-link">Help & Support</a>
      </div>
    </footer>
  );
};

export default Footer;
