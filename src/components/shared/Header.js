import React from 'react';
import logo from "../../Zenabi.Logo.png";

const Header = (props) => (
  <div className="header">
    <div className="logo-img">
      <img id="logo-img" src={logo} alt="react-logo" />
    </div>
  </div>
);

export default Header;
