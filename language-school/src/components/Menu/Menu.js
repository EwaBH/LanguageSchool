import React from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";

const Menu = () => {
  return (
    <div className="menu__container">
      <div className="menu"></div>
      <Link className="menuLink" to="/">
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
      <Link className="menuLink" to="/clasrooms">
       Sale lekcyjne
      </Link>
    </div>
  );
};
export default Menu;
