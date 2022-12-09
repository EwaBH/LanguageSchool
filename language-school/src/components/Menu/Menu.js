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
      {/* <Link className="menuLink" to="/">
        strona główna
      </Link>
      <Link className="menuLink" to="/timetables">
        <div>plan zajęć</div>
      </Link>
      <Link className="menuLink" to="/teachers">
        Nauczyciele
      </Link>
      <Link className="menuLink" to="/subjects">
        Przedmioty
      </Link>
      <Link className="menuLink" to="/classrooms">
       Sale lekcyjne
      </Link> */}
    </>
  );
};
export default Menu;
