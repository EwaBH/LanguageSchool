import React from "react";
import MenuLinks from "./MenuLinks";
import { Link } from "react-router-dom";
import "./Menu.scss";
import MobileMenu from "./MobileMenu";
import NormalMenu from "./NormalMenu";

const Menu = () => {
  return (
    <>
      <div className="menu__container">
        <NormalMenu />
        <MobileMenu />
      </div>
    </>
  );
};

export default Menu;
