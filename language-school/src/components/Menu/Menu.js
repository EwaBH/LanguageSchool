import React from "react";
import MobileMenu from "./MobileMenu";
import NormalMenu from "./NormalMenu";
import "./Menu.scss";

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
